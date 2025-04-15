
import userService from '../service/userService.js';
const handleGetUser = (req, res) => {
    userService.getAllUsers()
        .then((data) => {
            console.log(data);
            // Chỉ render sau khi có dữ liệu
            return res.render('home.ejs', { data: data });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Lỗi khi lấy dữ liệu');
        });
};

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let Pass = req.body.Pass;
    let UserName = req.body.UserName;

    userService.createNewUser(email, Pass, UserName)
        .then(() => {
            // Sau khi tạo xong, lấy lại danh sách người dùng
            return userService.getAllUsers();
        })
        .then((data) => {
            // Hiển thị lại trang với dữ liệu mới
            return res.render('home.ejs', { data: data });
        })
        .catch((error) => {
            console.error('Error:', error);
            return res.status(500).send('Có lỗi xảy ra khi tạo người dùng');
        });
};

const handleDeleteUser = (req, res) => {
    let id = req.params.id; // Lấy id từ query string
    return userService.deleteUser(id)

        .then(() => {
            // Sau khi xóa xong, lấy lại danh sách người dùng
            return userService.getAllUsers();
        })
        .then((data) => {
            // Hiển thị lại trang với dữ liệu mới
            return res.redirect('/'); // Hoặc bạn có thể render lại home.ejs nếu cần
        })
        .catch((error) => {
            console.error('Error:', error);
            return res.status(500).send('Có lỗi xảy ra khi xóa người dùng');
        });
}

const handleEditUser = (req, res) => {
    const userId = req.params.id;
    userService.handleEditUser(userId)
        .then(user => {
            res.render('edit-user.ejs', { user }); // Truyền user vào render view
        })
        .catch(error => {
            console.error('Lỗi khi lấy user:', error);
            res.status(500).send('Không thể lấy thông tin user');
        });
}

const handleUpdateUser = (req, res) => {
    const { id, email, pass, UserName } = req.body; // Lấy thông tin từ form

    // Gọi hàm updateUser trong service với thông tin đã được chuẩn bị
    userService.updateUser(id, email, pass, UserName)
        .then(() => {
            // Sau khi cập nhật xong, lấy lại danh sách người dùng
            return userService.getAllUsers();
        })
        .then(data => {
            // Hiển thị lại trang home với dữ liệu mới
            res.redirect('/'); // Hoặc bạn có thể render lại home.ejs nếu cần
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật người dùng:', error);
            res.status(500).send('Có lỗi xảy ra khi cập nhật người dùng');
        });
}


module.exports = {
    handleGetUser: handleGetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleUpdateUser: handleUpdateUser,
}
