import Users from "../models/Users"
import { validationResult } from "express-validator"
import { Utils } from "../utils/Utils"
// import { NodeMailer } from "../utils/NodeMailer"

export class UserController{
    static async signup(req, res, next){
        const name = req.body.name
        const phone = req.body.phone
        const email = req.body.email
        const password = req.body.password
        const type = req.body.type
        const status = req.body.status
        const verification_token = Utils.generateVerificationToken(5)
        
        const data= new Users({
            email,
            password,
            name,
            verification_token,
            verification_token_time:Date.now() + new Utils().MAX_TOKEN_TIME   ,
            type,
            status,
            phone
        })
        try{
            let user = await data.save()
            // await NodeMailer.sendMail({
            //     to: email,
            //     subject: "test",
            //     html: `Your OTP is ${verification_token}`

            // })
            res.send(user)
        }catch(e){
            console.error("Error sending email:", e.message);
            next(e)
        }
    }
    static async verify(req, res, next){
        const verification_token = req.body.verification_token
        const email = req.body.email
        try{
            const user = await Users.findByIdAndUpdate(
                {
                    email,
                    verification_token,
                    verification_token_time: {$gt: Date.now}
                },
                {email_verified: true},
                {new: true}
    
            );
            if(user){
                res.send(user)
            }else{
                throw new Error("Email Verification Token is expired. Please try again...")
            }
        }catch(e){
            next(e)
        };
    }
}