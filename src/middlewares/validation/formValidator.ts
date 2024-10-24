import { body } from 'express-validator';

const userValidator = [
    body("username")
        .exists({ values: "falsy" })
        .withMessage("Username is required")
        .bail(),
    body("email")
        .exists({ values: "falsy" })
        .withMessage("Password is required")
        .bail()
];

export {
    userValidator,
}