const app = require("./src/app");


const mongoose = require("mongoose");

 async function connectToDb(){
    await mongoose.connect("mongodb+srv://manish:gch1zAIdmPNYuSt6@cluster0.bsb0qeb.mongodb.net/Day-5")
    .then(()=>{
        console.log("Connected to Database");
    })
}

connectToDb()


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})