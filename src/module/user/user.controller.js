function home(req, res) {
    res.status(200).send('Welcome to our homepage!');
}

module.exports.home = home;