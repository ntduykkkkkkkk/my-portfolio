const Joi = require('joi');

const add = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().max(15).allow(''),
        lastname: Joi.string().max(15).allow(''),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(15).required(),
        passwordConfirm: Joi.ref('password')
    })
    return schema.validate(data)
}

const login = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(15).required(),
    })
    return schema.validate(data)
}

module.exports = {
    add,
    login
}