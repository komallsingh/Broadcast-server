const express=require("express");

const app=express();

app.use(express.json());

app.get("/health",(req,res)=>{
    res.json({
        message:"ok working"
    });
});

module.exports=app;
