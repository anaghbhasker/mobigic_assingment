import mongoose, { Schema } from "mongoose";

const fileSchema=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    file:{type:String},
    generatedCode:{type:String}
},
{
    timestamps:true,
}
)

const filemodel=mongoose.model('files',fileSchema)
export default filemodel