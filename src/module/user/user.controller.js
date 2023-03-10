const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = [];

function home(req, res) {
    res.status(200).send('Welcome to our homepage!');
}

function getUsers(req, res) {
    const allUsers = users.map(user => ({ ...user }))

    allUsers.map(user => delete user.password);

    res.status(200).send(allUsers);
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

function login(req, res) {
    const { email, password } = req.body;

    const user = findUser(email);

    if(!user) return res.status(401).send('Invalid credentials!');
    
    const matchedPassword = bcrypt.compareSync(password, user.password);
    
    if(!matchedPassword) return res.status(401).send('Invalid credentials!');

    const token = jwt.sign({ 
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.lastName 
        }, 
        'jwt security key for create token', 
        { 
            expiresIn:'1h', 
            issuer: user.email 
        });
        
    const modifyedUser = { ...user };
    delete modifyedUser.password;

    res.cookie("access_token", token, { httpOnly: true, signed: true });

    res.status(200).send(modifyedUser);
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
module.exports.getUsers = getUsers;
module.exports.userUpdate = userUpdate;
module.exports.findUser = findUser;
module.exports.login = login;


