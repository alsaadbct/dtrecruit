import { body } from 'express-validator';

const loginValidator = [
    body("username")
        .if(body('email').not().exists())
        .exists({ values: "falsy" })
        .withMessage("Username is required")
        .bail(),
    body("email")
        .if(body('username').not().exists())
        .exists({ values: "falsy" })
        .withMessage("Email is required")
        .bail(),
    body("password")
        .exists({ values: "falsy" })
        .withMessage("Password is required")
        .bail()
];

export {
    loginValidator,
}