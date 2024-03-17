const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


const upload = require('./upload')


app.get("/" , (req,res) => {
    let images = []
    fs.readdir("./public/uploads" , (err, files) => {
        if(!err){
            files.forEach(file => {
                images.push(file)
            })
            res.render("index", {images: images})
        } else{
            return console.log(err)
        }
    })
})

app.post("/", upload.single('file'), (req, res) => {
    console.log("Image Uploaded !!")
    res.redirect("/")
})

app.post("/delete" , (req,res) => {
    const deleteImages = req.body.deletedImages
    if (deleteImages.length > 0){
        deleteImages.forEach( image => {
        fs.unlink(`./public/uploads/${image}` , (err) => {
            if (err) {
                console.error(err)
              } else {
                console.log(`File ${"./public/uploads/"+image} has been deleted.`)
            }
        }) 
    })}
})

app.listen(3000)