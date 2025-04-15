
import userService from '../service/userService.js';
const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let Pass = req.body.Pass;
    let UserName = req.body.UserName;

    userService.createNewUser(email, Pass, UserName)



    console.log(req.body);



    return res.send('Create a new user');
}

module.exports = {
    handleHelloWorld: handleHelloWorld,
    handleCreateNewUser: handleCreateNewUser
}
