import express, { Router } from 'express';
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import College from './schema.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const adminPage = path.join(__dirname, 'adminPage', 'admin.html')
router.post('/admin',(req,res)=>{
    const { user, password } = req.body;
    if (user === '0000') {
        res.sendFile(adminPage)
    }else{
        res.send('Get Out')
    }
})

let storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './photos');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
let upload = multer({ storage : storage}).single('photo');  

router.post('/addCollege', upload, async (req, res) => {
    const colleges = new College();
    colleges.university_name = req.body.university_name;
    colleges.college_name = req.body.college_name;
    colleges.department = req.body.department;
    colleges.college_type = req.body.college_type;
    colleges.state_name = req.body.state_name;
    colleges.district_name = req.body.district_name;
    colleges.admission_fees = req.body.admission_fees;
    colleges.semester_fees = req.body.semester_fees;
    colleges.photo = req.file.originalname;

    colleges.save();
    res.status(201).json('success');
});

  

export default router;