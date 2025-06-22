import mongoose, { Schema, model, models } from "mongoose";

const documentschema = new Schema(
    {
        userId:{type:String,required:true,unique:true},
        name:{type:String,required:true},
        fathername:{type:String,required:true},
        mothername:{type:String,required:true},
        city:{type:String,required:true},
        insistitution:{type:String,required:true},
        result:{type:String,required:true},
        verified: { type: Boolean, default: false },
        document:{type:String,required:true},
    },
    {
        timestamps:true,
    }

);

const Document = models.Document || model("Document",documentschema);
export default Document;