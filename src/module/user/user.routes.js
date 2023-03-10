const { home, createUser } = require( "./user.controller" )

module.exports = (app) => {
    app.get('/', home);

    app.route('/users')
        .post(createUser);
}