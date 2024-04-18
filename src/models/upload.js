const mongoose=require("mongoose");
const uploadSchema=new mongoose.Schema({
name:{
    type:String,
     required:true
},
url:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true
},
offer:{
    type:String,
    required:true,

},
description:{
    type:String,
},
spec:{
    type:String,
},
category:{
    type:String,
}
})

const Upload=new mongoose.model("Upload",uploadSchema);
module.exports=Upload;