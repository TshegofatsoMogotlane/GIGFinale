import mongoose from "mongoose"
import { getEnvironmentVariables } from "./environments/environment"
import * as express from "express"


export class Server{
    private app: express.Application = express()
    constructor(){
        this.setConfigs()
        this.setRoutes()
    }
    setConfigs(){
        this.connectMongoDB()
    }
    connectMongoDB(){
        mongoose.connect(getEnvironmentVariables().db_uri)
        .then(()=>{
            console.log("Connected to MongoDB")
        }).catch(e=>{
            console.log(e)
        })
    }
    setRoutes(){
        this.userRoutes()
    }
    userRoutes(){
        this.app.get("/api/user/login", (req, res, next)=>{
            console.log(req)
            res.send("Success")
        })
    }
}

function express(): express.Application {
    throw new Error("Function not implemented.")
}
