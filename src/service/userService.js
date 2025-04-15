import bcrypt from "bcryptjs";
import mysql from 'mysql2';
const salt = bcrypt.genSaltSync(10);
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'testjwt',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
})

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}
const createNewUser = (email, pass, UserName) => {
    return new Promise((resolve, reject) => {
        let hash = hashPassword(pass);
        connection.query(
            'INSERT INTO users (email, password, user) VALUES (?, ?, ?)',
            [email, hash, UserName],
            (error, results) => {
                if (error) {
                    console.error('Error inserting data:', error);
                    reject(error); // báo lỗi về cho controller xử lý
                } else {
                    console.log('Data inserted successfully:', results);
                    resolve(results); // trả về kết quả thành công
                }
            }
        );
    });
};


const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.error('Error fetching data:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Error deleting data:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

const handleEditUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Error fetching data:', error);
                return reject(error);
            }

            // Nếu không tìm thấy user
            if (results.length === 0) {
                return reject(new Error('User not found'));
            }

            // Trả về user đầu tiên (vì id là duy nhất)
            resolve(results[0]);
        });
    });
};

const updateUser = (id, email, pass, UserName) => {
    return new Promise((resolve, reject) => {
        // Kiểm tra nếu mật khẩu mới được cung cấp
        let query = 'UPDATE users SET email = ?, user = ?';
        let params = [email, UserName];

        // Nếu có mật khẩu mới, băm mật khẩu và cập nhật
        if (pass) {
            let hash = hashPassword(pass); // Mã hóa mật khẩu mới
            query += ', password = ?'; // Thêm phần cập nhật mật khẩu vào câu lệnh SQL
            params.push(hash);
        }

        query += ' WHERE id = ?';
        params.push(id);

        // Thực thi câu lệnh cập nhật
        connection.query(query, params, (error, results) => {
            if (error) {
                console.error('Error updating data:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
}


module.exports = {
    hashPassword: hashPassword,
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    // add more functions as needed
    deleteUser: deleteUser,
    handleEditUser: handleEditUser,
    updateUser: updateUser,
}

