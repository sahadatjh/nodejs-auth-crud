module.exports = (schema) => {
    return function(req, res, next){
        schema.validate(req.body, { abortEarly: false })
            .then(() => {
                next();
            })
            .catch((err) => {
                return res.status(400).send(err.errors[0]);
            });
    }
}