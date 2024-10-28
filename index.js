const express = require("express");
const path = require("path");
const fs = require("fs");
const { name } = require("ejs");
const app = express();

app.use((express.json()));
app.use(express.urlencoded({ extended : true }));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));

app.get("/" , function(req , res){
    fs.readdir(`./files` , function(err , files){
        res.render("index" , {files : files});          // To handel the file showing part
    })
})

app.get("/files/:filename" , function(req , res){
    fs.readFile(`./files/${req.params.filename}` , "utf-8" , function(err , filedata){
        res.render(`show`,{filename: req.params.filename , filedata: filedata});    //because only filename is in params (url).
    })
})

app.post('/create' , function(req , res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details , function(err){   
        //  File location is joined with name of the file with which name we want to save our files , (req.body : is a object )  (.split(" ") splits that elements into a array followed by spaces) , (.join("") joins them together with no spaces)
        res.redirect("/")
    })
})

app.get("/edit/:filename" , function(req , res){
    res.render(`edit`,{filename: req.params.filename})    
})

app.post("/edit" , function(req , res){
    fs.rename(`./files/${req.body.prev}` , `./files/${req.body.new}` , function(err){
    })
    res.redirect("/")
}) 

app.listen(3000);