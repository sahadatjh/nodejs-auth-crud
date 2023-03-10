const validate = require( "../core/middlewares/validate" );
const { home, createUser, userUpdate, getUsers } = require( "./user.controller" );
const { createUserSchema, updateUserSchema } = require( "./user.schema" );

module.exports = (app) => {
    app.get('/', home);

    app.route('/users')
        .get(getUsers)
        .post(validate(createUserSchema), createUser);
    
    app.route('/users/:email')
        .patch(validate(updateUserSchema), userUpdate);
}