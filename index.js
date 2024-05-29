import express from 'express';
import Connection from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './route.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getFilterColleges, collgesForAdminPanel , deleteCollege} from './controller.js'
import nodemailer from 'nodemailer';
// import nodemailer from 'nodemailer'
dotenv.config();
const dbusername = process.env.DB_USERNAME;
const dbpassword = process.env.DB_PASSWORD;
// const baseUrl = process.env.BASE_URL;

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Connection(dbusername,dbpassword);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middle wayer to public folder
const publicPath = path.join(__dirname, '/client');
app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    res.sendFile(path.join(publicPath));
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(publicPath, 'about.html'));
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(publicPath, 'contact.html'));
})
app.get('/blogs',(req,res)=>{
    res.redirect('https://infotbangla.blogspot.com/');
})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(publicPath, 'login.html'));
})



//nodemailer
const emailPass = process.env.EMAILPASS;

const contactEmail = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'bwebsite865@gmail.com',
      pass:emailPass,
    }
  })
  contactEmail.verify((error)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Ready To Send');
    }
  })

  
app.post('/contact',(req,res)=>{
    const cname = req.body.cname;
    const cemail = req.body.cemail;
    const cphone = req.body.cphone;
    const cmsg = req.body.cmsg;


    const TheMail = {
        from: cname,
        to:'kaustavdatta02@gmail.com',
        subject:'MCET USER CONTACT',
        html:`
        <h3>NAME : ${cname}</h3>
        <h3>EMAIL : ${cemail}</h3>
        <h3>Phone Number : ${cphone}</h3>
        <h3>MESSAGE : ${cmsg}</h3>
        `
    }
    contactEmail.sendMail(TheMail,(error)=>{
        if (error) {
            res.json({status:'Sorry We Are Unable To Send Your Message Now !'})
        } else {
            res.json({status:'Message Sent ! We Will Response Soon'})
        }
    });
  
  });




app.use(cors());
app.use(express.json())
app.use('/', Routes);


//send all colleges full data
app.get('/filter', getFilterColleges);

// send only district id and college name
app.get('/collegesAdminPanel', collgesForAdminPanel);

//delete college api
app.post('/deleteCollege/:_id',deleteCollege);

app.get('/photos/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.sendFile(__dirname + `/photos/${imageName}`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
