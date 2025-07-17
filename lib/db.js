import mongoose from "mongoose";
const MONGO_URI = process.env.DB_URL
if(!MONGO_URI) {
      throw new Error("Please define the DB_URL environment variable inside .env.local");
    }
    let cached =global.mongoose;
    
if(!cached){
    cached = global.mongoose = {conn:null,promise:null}
}    
    export async function connectToDB() {
        if(cached.conn) {
            return cached.conn;
        }
        if(!cached.promise){
                 cached.promise = mongoose.connect(MONGO_URI).then((mongoose)=>mongoose).catch((err) => {
            throw new Error("Failed to connect to MongoDB: " + err.message);
            })
            }
console.log("global.mongoose", global.mongoose)
            cached.conn = await cached.promise
            return cached.conn
    
}