import { body } from "express-validator"

export class UserValidators{
    static signup(){
        return[
            body("email","Email is required").isString(),
            body("password", "Password is required").isLength({ min: 8, max:25 })
            .withMessage("Password must be between 8 to 25 characters long"),
            body("name","Name is required").isString(),
            body("phone","Phone number is required").isString(),
            body("type","User role type is required").isString(),
            body("status","User Status is required").isString(),
            
        ]
    }
    static userEmailVerification(){
        return[
            body("email","Email is required").isString(),
            body("verification_token","Verification token is required").isString(),
        ]
    }
}