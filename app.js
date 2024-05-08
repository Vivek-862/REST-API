const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app= express();

mongoose.connect("mongodb://localhost:27017/Sample",{
    
    useUnifiedTopology: true,
    useNewUrlParser: true,
).then(()=>{
    console.log("connected with mongodb")
}).catch((err)=>{
    console.error("connection failed",err);
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


//schema
const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,

})

//collection or model
const Product = new mongoose.model("Product",productSchema)

//create product
app.post("/api/v1/product/new",async(req,res)=>{

    const product =  await  Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    });


    
  
})




app.listen(4500,()=>{
    console.log("server is working http://localhost:4500");

})