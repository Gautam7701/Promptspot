import mongoose from "mongoose";
import dotenv from"dotenv";
dotenv.config()

let isConnected = false;  //track the connection
 export const connectToDB = async() => {
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }


    try {
        await mongoose.connect("mongodb+srv://user2005:Gaut8920@cluster0.qcjtx.mongodb.net/share_prompt?retryWrites=true&w=majority&appName=Cluster0",{
            dbName : "share_prompt",
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
        })

        isConnected=true;

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }

 }

