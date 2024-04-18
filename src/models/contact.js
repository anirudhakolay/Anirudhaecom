const mongoose=require("mongoose");
const querySchema=new mongoose.Schema({
firstname:{
    type:String,
     required:true
},
lastname:{
    type:String,
    required:true,
},
Email:{
    type:String,
    required:true
},
country:{
    type:String,
    required:true,

},
subject:{
    type:String,
}
})
const Contact=new mongoose.model("Contact",querySchema);
module.exports=Contact;