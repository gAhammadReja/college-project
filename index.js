import express from 'express';
import Connection from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './route.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getFilterColleges } from './controller.js'

// import nodemailer from 'nodemailer'
dotenv.config();
const dbusername = process.env.DB_USERNAME;
const dbpassword = process.env.DB_PASSWORD;
const baseUrl = process.env.BASE_URL;

Connection(dbusername,dbpassword);



const app = express()
const port = process.env.PORT || 3000;

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
    res.sendFile(path.join(publicPath, 'about.html'));
})
app.get('/blogs',(req,res)=>{
    res.redirect('https://infotbangla.blogspot.com/');
})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(publicPath, 'login.html'));
})
app.get('/logout',(req,res)=>{
    res.redirect(`${baseUrl}/login`);
})






app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json())
app.use('/', Routes);



app.get('/filter', getFilterColleges);


app.get('/photos/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.sendFile(__dirname + `/photos/${imageName}`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))