const Sequelize = require('sequelize'); // Sửa lại import

const sequelize = new Sequelize('jwt', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Bật logging (tùy chọn)
})

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;