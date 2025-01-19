import  { Server} from "../src/server"

let server = new Server().app
const port  = 3002
server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})





