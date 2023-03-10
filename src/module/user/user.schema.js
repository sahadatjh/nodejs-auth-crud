const { object, string, ref } = require('yup');

const createUserSchema = object().shape({
    firstName: string()
        .required()
        .min(2, "firstName must be minimum 2 characters long!")
        .max(100, "firstName must be maximum 100 characters long!"),
    lastName: string()
        .required()
        .min(2, "lastName must be minimum 2 characters long!")
        .max(100, "lastName must be maximum 100 characters long!"),
    email: string()
        .email("Please provide a valid email!")
        .required()
        .min(2, "email must be minimum 2 characters long!")
        .max(100, "email must be maximum 100 characters long!"),
    password: string()
        .required()
        .min(8, "password must be minimum 8 characters long!")
        .max(32, "password must be maximum 32 characters long!"),
    confirmPassword: string()
        .required()
        .oneOf([ref('password'), null], "Password and confirm password must be matched!")
});

const updateUserSchema = object().shape({
    firstName: string()
        .required()
        .min(2)
        .max(100),
    lastName: string()
        .required()
        .min(2)
        .max(100)
});



module.exports.createUserSchema = createUserSchema;
module.exports.updateUserSchema = updateUserSchema;