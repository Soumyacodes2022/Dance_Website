const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyp = require("body-parser");
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/Contactdance');
}
const port=80;
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });
const contact = mongoose.model('contact', ContactSchema);
//EXPRESS Specific staff
app.use('/static',express.static('static'))
app.use(express.urlencoded())
//Pug specific staff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const parames={ 'title':'Hello World', 'content':'This is soumya' }  
    res.status(200).render('home.pug', parames)
})

app.get('/contact',(req,res)=>{
    const parames={ 'title':'Hello World', 'content':'This is soumya' }  
    res.status(200).render('contact.pug', parames)
})

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.")
    }).catch(()=>{
        res.status(400).send("the data failed to be saved")
    })  
    
})

app.listen(port,()=>{
    console.log('Listening')
})