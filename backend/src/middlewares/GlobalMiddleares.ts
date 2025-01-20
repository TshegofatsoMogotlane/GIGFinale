import { validationResult } from "express-validator";

export class GlobalMiddleware{
    static checkErrors(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next()
    }
    
}