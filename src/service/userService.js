import bcrypt from "bcryptjs";
import mysql from 'mysql2';
import db from '../models/index.js'; // Đường dẫn đến file index.js trong thư mục models


const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, pass, UserName) => {
    const hash = hashPassword(pass);
    try {
        const newUser = await db.User.create({
            user: UserName,
            email: email,
            password: hash
        });
        return newUser;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; // Không cần Promise.reject(error) trong async
    }
};


const getAllUsers = async () => {
    try {
        const users = await db.User.findAll(); // Lấy tất cả user
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const result = await db.User.destroy({
            where: { id: id }
        });

        // result là số bản ghi bị xóa (0 nếu không có bản ghi nào)
        return result;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

const handleEditUser = async (id) => {
    try {
        const user = await db.User.findByPk(id); // Tìm theo khóa chính (primary key)

        if (!user) {
            throw new Error('User not found');
        }

        return user; // Trả về object user
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const updateUser = async (id, email, pass, UserName) => {
    try {
        const user = await db.User.findByPk(id); // Tìm user theo ID

        if (!user) {
            throw new Error('User not found');
        }

        // Cập nhật thông tin
        user.email = email;
        user.user = UserName;

        if (pass) {
            const hash = hashPassword(pass); // Mã hóa mật khẩu mới
            user.password = hash;
        }

        await user.save(); // Lưu thay đổi vào DB

        return { message: 'User updated successfully', user: user.toJSON() };
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};



module.exports = {
    hashPassword: hashPassword,
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    // add more functions as needed
    deleteUser: deleteUser,
    handleEditUser: handleEditUser,
    updateUser: updateUser,
}

