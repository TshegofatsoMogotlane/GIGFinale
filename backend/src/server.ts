import * as express from "express"
import mongoose from "mongoose"
import { getEnvironmentVariables } from "./environments/environment"
import UserRouter from "./routers/UserRouter"
import bodyParser = require("body-parser")
import * as cors from "cors"



export class Server{
    public app: express.Application = express()
    constructor(){
        this.setConfigs()
        this.setRoutes()
        this.error404Handler()
        this.handleErrors()
    }
    setConfigs(){
        this.connectMongoDB()
        this.allowCors()
        this.configureBodyParser()
    }
    connectMongoDB(){
        mongoose.connect(getEnvironmentVariables().db_uri)
        .then(()=>{
            console.log("Connected to MongoDB")
        }).catch(e=>{
            console.log(e)
        })
    }
    allowCors(){
        this.app.use(cors())
    }
    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
    }
    setRoutes(){
        this.userRoutes()
    }
    userRoutes(){
        this.app.use("/api/user", UserRouter)
    }
    error404Handler(){
        this.app.use((req, res)=>{
            res.status(404).json({
                message:"Not Found",
                status_code:404
            })
        })
    }
    handleErrors(){
        this.app.use((error,req, res, next)=>{
            const errorStatus = req.errorStatus || 500
            res.status(errorStatus).json({
                message:error.message ||"Something went wrong/ Please try again",
                status_code:errorStatus
            })
        })
    }
}


