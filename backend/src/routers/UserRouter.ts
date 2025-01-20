import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {body, validationResult} from "express-validator"
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleares";

class UserRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.getRoutes()
        this.postRoutes()
        this.patchRoutes()
        this.putRoutes()
        this.deleteRoutes()
    }
    getRoutes(){
    }
    postRoutes(){
        this.router.post("/signup", UserValidators.signup(),GlobalMiddleware.checkErrors ,UserController.signup)
    }
    patchRoutes(){
        this.router.patch("/verify", UserValidators.userEmailVerification(),GlobalMiddleware.checkErrors ,UserController.verify)
    }
    putRoutes(){}
    deleteRoutes(){}
}

export default new UserRouter().router