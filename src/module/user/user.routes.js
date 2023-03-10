const validate = require( "../core/middlewares/validate" );
const { home, createUser, userUpdate } = require( "./user.controller" );
const { createUserSchema, updateUserSchema } = require( "./user.schema" );

module.exports = (app) => {
    app.get('/', home);

    app.route('/users')
        .post(validate(createUserSchema), createUser)
    
    app.route('/users/:email')
        .patch(validate(updateUserSchema), userUpdate);
}