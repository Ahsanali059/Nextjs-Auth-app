import { error } from "console";
import mongoose from "mongoose";

export async function connect()
{
    try
    {
        //! means url all taking care of my side 
        mongoose.connect("mongodb://localhost:27017/usersNextjsDb");
        const conncetion = mongoose.connection;
        
        conncetion.on('connected',()=>{
            console.log("MongDb Connected");
            
        })

        conncetion.on('error',(error)=>{
            console.log("not Connected to mongodb");
            process.exit();
            
        })
    }
    catch(e)
    {
        console.log("something went wrong while connected with db");
        throw error; 
    }

}
