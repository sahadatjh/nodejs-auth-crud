const validate = require( "../core/middlewares/validate" );
const { home, createUser } = require( "./user.controller" );
const { createUserSchema } = require( "./user.schema" );

module.exports = (app) => {
    app.get('/', home);

    app.route('/users')
        .post(validate(createUserSchema), createUser);
}