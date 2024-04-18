const { response } = require('express');
const express=require('express');
const app=express()
const hbs=require("hbs");
const async = require('hbs/lib/async');
const { restart } = require('nodemon');
const path =require("path");
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require("./db/conn");
const Register=require("./models/registers");
const console = require('console');
const Contact = require("./models/contact");
const Upload = require('./models/upload');
//const Upload = require("./models/upload");
const port=process.env.PORT ||3000;
const static_path=path.join(__dirname ,"../templates/views");
const template_path=path.join(__dirname ,"../templates/views");
const partials_path=path.join(__dirname ,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//console.log(path.join(__dirname,"Project/view"))
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render("hi");
})
app.get("/home",(req,res)=>{
    res.render("hi");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/logout",(req,res)=>{
    res.render("hi");
})
app.get("/continue/:id",async(req,res)=>{
    let id =req.params.id;
    let productData=await Upload.findOne({_id:id});
     if (productData){
         res.render('continue',{data:productData});
         
     } 
     else{
         res.end("invalid equest");
     }
     var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajatpandit066@gmail.com',
          pass: 'niraj066'
        }
      });
      
      var mailOptions = {
        from: 'rajatpandit06655@gmail.com',
        to:     'rajatpandit066@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
})

app.get("/order/:id",async(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reetaroashan@gmail.com',
          pass: '9699761883'
        }
      });
      
      var mailOptions = {
        from: 'reetaroashan@gmail.com',
        to: 'rajatpandit06655@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    let id =req.params.id;
    let productData=await Upload.findOne({_id:id});
     if (productData){
         res.render('order',{data:productData});
         
     } 
     else{
         res.end("invalid equest");
     }
})
app.post("/registers", async(req,res)=>{
    try{
         
     
       const myData = new Register(req.body);
        const registered=await myData.save();
           // res.send("item saved to database");
             res.status(201).render("hi");
        
                } catch(error) {
       return res.status(400).send(error); 
        }       
})
app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} and password is ${password}`)
        const useremail=await Register.findOne({ email: email});
        //res.send(useremail.password);
        console.log(useremail);
       // const token=await useremail.generateAuthToken();
       //console.log(token);
        if(useremail.password===password){
            res.status(201).render("hi2",{nam:useremail})
            console.log(useremail.password);
        }
        else{
            res.send("Invalid Id or Password");
        }

    } catch (error) {
        res.status(400).send("Invalid Email")
    }
})
app.post("/contact", async(req,res)=>{
    try{
         
        
       const myData = new Contact(req.body);
        myData.save();
             res.status(201).render("hi");
        
                } catch(error) {
       return res.status(400).send(error); 
        }
       
})
app.get("/adminlog",(req,res)=>{
    res.render("adminlog");
})

app.post("/adminlog",(req,res)=>{
    const email=req.body.email;
    const pass=req.body.pass;
    let mymail="admin@gmail.com";
    let mypass="admin";
    if(email==mymail&&pass==mypass){
        res.status(201).render("upload");
        console.log(email,pass);
    }
    else{
        res.send("Invalid Id or Password");
    }
})

app.post("/upload", async(req,res)=>{
    try{
         
     
       const myData = new Upload(req.body);
        myData.save();
             res.status(201).render("upload");
        
                } catch(error) {
        res.status(400).send(error); 
        }
       
})
app.post("/kart", async(req,res)=>{
    try{
         
     
       const myData = new Data(req.body);
        const registered=await myData.save();
           // res.send("item saved to database");
             res.status(201).render("kart");
        
                } catch(error) {
       return res.status(400).send(error); 
        }
       
})
app.get("/hello",async(req,res)=>{
    try{
        const getmens=await Upload.find({category:"mobile"});
        res.status(201).send(getmens);
       
    }catch(e){
        res.status(400).send(e);
    }
})
app.get("/hii",async(req,res)=>{
    try{
        const getmens=await Upload.find({category:"laptop"});
        res.status(201).send(getmens);
       
    }catch(e){
        res.status(400).send(e);
    }
})

app.get('/onclick/:id',async(req,res)=>{
   
    var id=req.params.id;
    let productData=await Upload.findOne({_id:id});
     if (productData){
         res.render('onclick',{data:productData});
         
     } 
     else{
         res.end("invalid equest");
     }
       
     
})
app.get('/kart/:id',async(req,res)=>{
    let id =req.params.id;
    let productData=await Upload.findOne({_id:id});
     if (productData){
         res.render('kart',{data:productData});
         
     } 
     else{
         res.end("invalid equest");
     }
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})