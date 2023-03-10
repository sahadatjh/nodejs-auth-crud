const express = require('express');
const cookieParser = require('cookie-parser')
const userRoutes = require( '../../module/user/user.routes' );

module.exports = function () {
    const app = express();
    
    app.use(express.json());
    app.use(cookieParser('cookie parser secret'));

    userRoutes(app);

    app.set('port', process.env['PORT']);

    return app;
}