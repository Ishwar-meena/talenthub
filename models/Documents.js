import  { Schema, model, models } from "mongoose";

const documentschema = new Schema(
    {
        userId:{type:String,required:true},
        name:{type:String,required:true},
        fathername:{type:String,required:true},
        mothername:{type:String,required:true},
        city:{type:String,required:true},
        insistitution:{type:String,required:true},
        result:{type:String,required:true},
        marksheet:{type:String,required:true},
        exam:{type:String,required:true},
        verified: { type: Boolean, default: false },
        rejected: { type: Boolean, default: false },
        reason: { type: String },
    },
    {
        timestamps:true,
    }

);

const Document = models.Document || model("Document",documentschema);
export default Document;