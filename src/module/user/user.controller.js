const bcrypt = require('bcrypt');
const users = [];

function home(req, res) {
    res.status(200).send('Welcome to our homepage!');
}

function createUser(req, res) {  
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const user = findUser(email);

    if(user) return res.status(400).send('User already exist!')

    const hashPassword = bcrypt.hashSync(password, 9);

    const newUser = {
        firstName, 
        lastName, 
        email, 
        password: hashPassword
    }

    users.push(newUser);

    const modifyedUser = { ...newUser };
    delete modifyedUser.password;

    res.status(201).send(modifyedUser);
}

const findUser = (email) => {
    const user = users.find(user => user.email === email);

    return user;
}

function userUpdate(req, res) {
    const { firstName, lastName } = req.body;
    const { email } = req.params;

    const user = findUser(email);

    if(!user) return res.status(400).send("User not found");

    user.firstName = firstName;
    user.lastName = lastName;

    const modifyedUser = { ...user };
    delete modifyedUser.password;

    return res.status(202).send(modifyedUser);
}

module.exports.home = home;
module.exports.createUser = createUser;
module.exports.userUpdate = userUpdate;
module.exports.findUser = findUser;
