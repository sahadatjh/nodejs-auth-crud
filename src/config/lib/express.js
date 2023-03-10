const express = require('express');
const userRoutes = require( '../../module/user/user.routes' );

module.exports = function () {
    const app = express();
    
    app.use(express.json());

    userRoutes(app);

    app.set('port', process.env['PORT']);

    return app;
}