const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const multer = require("multer");
const path = require("path");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET, POST"]
}));

app.use("/public", express.static("public"));

var mysql = require("mysql2");

const con = mysql.createConnection({
  user: "b35583c78ec649",
  host: "us-cdbr-east-04.cleardb.com",
  password: "9213e714",
  database: "heroku_c39de287c15c6cd",
});

con.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
  setInterval(function () {
    console.log("c")
    con.query("SELECT 1");
  }, 5000);
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://videonow.herokuapp.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/upload", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `public/${file.originalname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/uploadvideo", upload.single("file"), (req, res)=>{

  console.log(req.file);
  console.log(req.body);

  con.query("Insert into video (videoname, videotitle, publishername, publishdate) Values (?, ?, ?, ?)", [req.file.filename, req.body.text, req.body.publishername, req.body.date], (er, result)=>{
    res.send("Upload Successful")
  })
});

app.get("/getvideo", (req, res)=>{
  console.log("request");
  con.query("Select * from video", (er, result)=>{
    console.log(result);
    console.log(er);
    res.send(result)
  })
});

app.get("/getsinglevideo", (req, res)=>{
  const range = req.headers.range;

  if(!range) {
    res.send("Range Required")
  }

  const videPath= 'are.mp4'
  const videoSize = fs.statSync("are.mp4").videoSize

  const CHUNK_SIZE = 10**6;
  const start = Number(range.replace(/\D/g), '')
  const end = Math.min(start + CHUNK_SIZE, videoSize -1)

  const contentlength = end-start + 1;
  const headers = {
    "Content-Range":`bytes ${start} - ${end} / ${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentlength,
    "Content-Type": "video/mp4"
  }
res.writeHead(206, headers)
  const videoStream = fs.createReadStream(videPath, {start, end});
  videoStream.pipe(res)

});

app.listen(process.env.PORT || 3001, () => {
  console.log("server is running");
});
