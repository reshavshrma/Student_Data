const express = require("express");
const app= express();
const mongoose = require("mongoose");
const cors=require("cors")
app.use(cors())
app.use(express.json()) 

const schema = mongoose.Schema({
    name:String,
    email:String,
    phone:String

})

const Usermodel = mongoose.model("users",schema);

app.get("/", async (req,res)=>
{ 
    const newdata=await Usermodel.find({});
    res.json({people:newdata});
})

app.post("/create", async  (req,res)=>{ 
    const newdata= new Usermodel(req.body)
    await newdata.save();
    res.send({people:newdata})
})

app.put("/update/:id", async (req,res)=>
{
    const {id}=req.params;
    const{name,email,phone}=req.body;
    const data=await Usermodel.updateOne({_id:id},{name:name,email:email,phone:phone}) 
    res.send({people:data})

})

app.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params;
    const data=await Usermodel.deleteOne({_id:id})
    res.send({people:data})     
})  
        

mongoose.connect("YOUR CONNECTION LINK")
.then(()=> 
{
    console.log("Connected to Mongodb")   
    console.log("Server is running...")
    app.listen(5000);
}).catch((err)=>console.log(err)) 
