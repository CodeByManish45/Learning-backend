const express = require("express");
const userModel = require("./models/schema.model");

const app = express()

app.use(express.json())

app.post("/user",async(req,res)=>{
    
    const {username,password} = req.body;

    const user =await userModel.create({
        username,
        password
    })
    
    res.status(201).json({
        message:"Data created successfully"
    })
})


app.get("/user",async(req,res)=>{

    const users =await userModel.find()

    res.status(200).json({
        message:"data fatched",users
    })
})

app.delete("/user/:id", async (req, res) => {

    await userModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "User deleted successfully"
    });

});



module.exports = app;
