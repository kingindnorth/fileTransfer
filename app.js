const express = require("express")
const multer = require("multer")
const bcrypt = require("bcrypt")
const ejs = require("ejs")
const mongoose = require("mongoose")

const File = require("./models/File")

require("dotenv").config()

const app = express()

app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")

const upload = multer({ dest:"upload" })

//routes
app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/upload",upload.single("file"),async(req,res)=>{
    const fileData = {
        path:req.file.path,
        originalName:req.file.originalname
    }

    if(req.body.password && req.body.password !== ""){
        fileData.password = await bcrypt.hash(req.body.password,10)
    }

    const file = await File.create(fileData)

    console.log(file)

})

const PORT = process.env.PORT || 9090

app.listen(PORT,()=>{
    console.log(`server running on port:${PORT}`);
})