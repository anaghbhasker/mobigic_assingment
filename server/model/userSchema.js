import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{type:String,required:true,trim:true}, 
    password: {
        type: String,
        trim:true,
        required: true,
    },
    
},
{
    timestamps:true,
}
)

const usermodel=mongoose.model('users',userSchema)
export default usermodel