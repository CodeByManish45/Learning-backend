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

    try {
        const users =await userModel.find()

    res.status(200).json({
        message:"data fatched",users
    })
    } catch (error) {
        res.status(500).json({
            message:"Error occurred while fetching data"
        })
    }
})

app.delete("/user/:id", async (req, res) => {

    try {
        await userModel.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while deleting user"
        });
    }
});





module.exports = app;
