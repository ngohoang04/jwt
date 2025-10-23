import bcrypt from 'bcryptjs';
import db from '../models/index.js';
var salt = bcrypt.genSaltSync(10);


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                role: data.role
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashed = await bcrypt.hashSync(password, salt);
            resolve(hashed);
        } catch (err) {
            reject(err);
        }
    });
};

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll();
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
};

let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findByPk(id);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id } });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.id) {
                return reject("Thiếu ID người dùng để cập nhật!");
            }

            let user = await db.User.findByPk(data.id);

            if (!user) {
                return resolve("Không tìm thấy người dùng!");
            }

            // Cập nhật thông tin
            user.email = data.email;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            user.gender = data.gender === '1' ? true : false;
            user.role = data.role;

            // Nếu có mật khẩu mới
            if (data.password && data.password.trim() !== "") {
                // Nếu bạn có hàm hashPassword:
                // user.password = hashPassword(data.password);
                user.password = data.password; // hoặc giữ nguyên nếu không hash
            }

            await user.save();
            resolve("Cập nhật thành công!");
        } catch (err) {
            reject(err);
        }
    });
};

export default {
    createNewUser,
    hashUserPassword,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserData
};