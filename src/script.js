import dotenv from "dotenv"
import connection from "./db/index.js"
import mongoose from 'mongoose';

dotenv.config({
    path: ".env"
})

connection()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is up and running at ${process.env.PORT}`)
    })
})
.catch((error)=> {
    console.log("ERROR: Can't connect to database", error)
})


















/*(async()=>{
    try
    {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error)=> {
            console.log("Not able to connect to DB",  error)
            throw err
        })
        app.listen(process.env.PORT, ()=> {
            console.log(`APP is listening on: ${process.env.PORT}`)
        })
    }
    catch(error)
    {
        console.log("ERROR while connecting to database", error)
        throw err
    }
} )()*/