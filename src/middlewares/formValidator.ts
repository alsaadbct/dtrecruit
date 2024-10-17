import { body } from 'express-validator';

const loginValidator = [
    body("username")
        .exists({ values: "falsy" })
        .withMessage("Username is required")
        .bail(),
    body("password")
        .exists({ values: "falsy" })
        .withMessage("Password is required")
        .bail()
];

export {
    loginValidator,
}