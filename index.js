var express = require('express');
var cors = require('cors');
require('dotenv').config()

const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// initialising multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directory were file uploaded will be safed
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});


// allow to read file

app.use(bodyParser.urlencoded({extended: false}));



app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
