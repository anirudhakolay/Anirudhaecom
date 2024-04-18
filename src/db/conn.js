const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://anirudhakolay08062001:admin@cluster0.7qsorwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser:true,
}).then(()=>{
    console.log("Connection Successfully");
}).catch((e)=>{
    console.log("No connection");
})