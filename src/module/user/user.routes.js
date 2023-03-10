const { home } = require( "./user.controller" )

module.exports = (app) => {
    app.get('/', home);
}