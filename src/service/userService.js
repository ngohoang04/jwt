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

    let hash = hashPassword(pass);
    connection.query('INSERT INTO users (email, password, user) VALUES (?, ?, ?)', [email, hash, UserName], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted successfully:', results);
    });
}

module.exports = {
    hashPassword: hashPassword,
    createNewUser: createNewUser,
    // add more functions as needed
}

