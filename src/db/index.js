import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js"

const connection = async function(){
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)//to be added /${DB_NAME}
        console.log(`\n DB Connected. DB Host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
}

export default connection