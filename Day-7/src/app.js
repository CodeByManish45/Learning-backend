const express = require("express");
const postModel = require("./models/post.model");
const { any } = require("webidl-conversions");


const app = express();
app.use(express.json())

app.post("/create-post", (req,res)=>{
    try {
        
    const{Image,caption}= req.body

    const posts =  postModel.create({
        Image,
        caption
    });

    res.status(201).json({
        message:"post create successfully",
        posts
    })

    } 
    catch (error) {

        res.status(500).json({
            message: error.message
        })
        
    }

});

app.get("/posts", async (req,res)=>{
   try {

      const posts = await postModel.find()

      res.status(200).json({
        message:"Fetched successfully",
        posts
      })

   } catch (error) {

      res.status(500).json({
        message:"Failed to fetch posts"
      })

   }
});

app.delete("/delete-post/:id", async(req,res)=>{
    try {
        const deletePost = await postModel.findByIdAndDelete(req.params.id)

        res.status(204).json({
            message:"Deleted successfully",deletePost
        })
    } 
    catch (error) {
        console.error("Failed to delete post: ", error.message)
        res.status(500).json({
            message:"Failed to delete post"
        })

    }
});


module.exports = app;