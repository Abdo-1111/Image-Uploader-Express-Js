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
    res.render("login")    
})


app.get("/app", (req,res) => {
    let images = []
    let key = req.query.key
    console.log(key)
    fs.readdir("./public/uploads/"+key, (err, files) => {
        if(!err){
            files.forEach(file => {
                images.push(file)
            })
            res.render("app", {images: images , key:key})
        } else{
            fs.mkdir(path.join("./public/uploads", key),
            (err) => {
                if (err) {
                    return console.error(err)
                }
                console.log('Directory created successfully!')
            })
            res.render("app", {images: images})
        }
        })
    
})

app.post("/app", upload.single('file'), (req, res) => {
    console.log("Image Uploaded !!")
    res.redirect("/app?key="+req.body.key)
})

app.post("/delete" , (req,res) => {
    const deleteImages = req.body.deletedImages
    const key = req.body.key_value
    if (deleteImages){
        deleteImages.forEach( image => {
        fs.unlink(`./public/uploads/${key}/${image}` , (err) => {
            if (err) {
                console.error(err)
              } else {
                console.log(`File ${"./public/uploads/"+key+"/"+image} has been deleted.`)
            }
        }) 
    })}
})

app.listen(3000)