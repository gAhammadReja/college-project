import mongoose from "mongoose";

const Connection = async(username, password) =>{
    const URL = `mongodb+srv://${username}:${password}@atlascluster.wpxv39e.mongodb.net/colleges?retryWrites=true&w=majority&appName=AtlasApp
    `;
    //   const URL = `mongodb://127.0.0.1:27017/colleges`
        await mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true, });
        console.log('Database Connect Successfully');
    try{
       
    }catch(error){
        console.log('Error While Connecting Database')
    }
}
export default Connection;

