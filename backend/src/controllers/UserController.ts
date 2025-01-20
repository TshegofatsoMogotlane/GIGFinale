import Users from "../models/Users"
import { validationResult } from "express-validator"

export class UserController{
    static signup(req, res, next){
        const errors = validationResult(req)
        const name = req.body.name
        const phone = req.body.phone
        const email = req.body.email
        const password = req.body.password
        const type = req.body.type
        const status = req.body.status
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg))
          }
        
        const data= new Users({
            email,
            password,
            name,
            type,
            status,
            phone
        })
        let user = new Users(data)
        user.save().then((user)=>{
            res.send(user)
        }).catch(e=>{
            next(e)
        })
    }
}