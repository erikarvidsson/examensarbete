const express = require("express"),
  http = require("http"),
  app = express(),
  server = http.createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

require("dotenv").config();

const port = process.env.PORT || 5000;

// server.listen(5000, "127.0.0.1", function() {
//   server.close(function() {
//     server.listen(5000, "0.0.0.0");
//   });
// });

server.timeout = 300000;

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established sucessfully");
});

// const uploads = require("./uploads");
const userRouter = require("./routes/users");
const dataRouter = require("./routes/data");
const indexRouter = require("./routes/index");
const userLogin2Router = require("./routes/userLogin");
const emailServices = require("./routes/emailService");
// const sendEmail = require("./routes/send-email");

app.use("/users", userRouter);
app.use("/data", dataRouter);
app.use("/index", indexRouter);
app.use("/userLogin", userLogin2Router);
app.use("/emailServices", emailServices);


app.use(express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// SET STORAGE
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(file.filename, "test" + file.fieldname + "-" + Date.now());
  }
});

// var upload = multer({ storage: storage })
