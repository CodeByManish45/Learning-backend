const express = require("express");

const app = express()

app.use(express.json()); //

const notes = []

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);  // req.body ka use ham discription me ya jaha data bahut bada hota, jo hamko pata nahi hota hai ki kitna bada hai is liye req.body ka use hota hai.
    res.send("notes created")
})

app.patch("/notes/:index",(req,res)=>{ // patch ek data ko update karne ke liye use hota hai. and :index yr array of object ka index batata hai.
    notes[req.params.index].description = req.body.description // params ka use limited data me use kiya jata hai. jaise index 1 se 100 tak man lo, to ye ek limited data hai.
    notes[req.params.index].tittle = req.body.tittle

    res.send("description updated")
})

app.delete("/notes/:index",(req,res)=>{

    delete notes[req.params.index]

    res.send("Notes Deleted")
})

module.exports = app