//api codes
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const scanRoutes = require("./routes/scan");
const multer = require("multer");
const axios = require("axios");
const chatbotRoutes = require("./routes/chatbot");
const FormData = require("form-data");
const fs = require("fs");
// =============================

//============================
require("dotenv").config();
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/Safnet");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  RegisterModel.findOne({ email: email }).then((user) => {
    if (user) {
      //using bcrypt
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          //jwt token
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          res.json("Success");
        } else {
          return res.json("The password is incorrect");
        }
      });
    } else {
      res.json("No record found");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      RegisterModel.create({ name, email, password: hash })
        .then((registers) => res.json(registers))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Token is wrong");
      next();
    });
  }
};
app.get("/home", verifyUser, (req, res) => {
  return res.json("Success");
});

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  RegisterModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1d",
    });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // from .env
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "tanisha.23.bansal@gmail.com",
      subject: "Reset your password",
      text: `http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

app.listen(3001, () => {
  console.log("Server is running");
});

app.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          RegisterModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
// Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ Status: "Logged out successfully" });
});

//==================================================File Upload Proxy======
// Proxy route to forward file uploads to teammate's ngrok API
app.post("/api/files", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    
    // Read the uploaded file and append to form data
    formData.append("file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Get ngrok URL from environment variable
    const NGROK_URL = process.env.NGROK_FILE_UPLOAD_URL || "http://localhost:5000";
    
    console.log(`Forwarding file upload to: ${NGROK_URL}/api/files/`);
    
    const response = await axios.post(`${NGROK_URL}/api/files/`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    console.log("File upload successful");
    res.json(response.data);
  } catch (error) {
    console.error("File upload proxy error:", error.message);
    
    // Clean up the temporary file on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Error cleaning up file:", cleanupError);
      }
    }
    
    res.status(500).json({ 
      error: "File upload failed", 
      details: error.response?.data || error.message 
    });
  }
});

//==================================================Malware======
app.use("/api", scanRoutes);

// other existing routes (login/register/forgot)...
// e.g. app.post('/login', ...)

// quick debug to ensure key loaded
console.log(
  "VirusTotal Key:",
  process.env.VIRUSTOTAL_API_KEY ? "✅ Loaded" : "❌ Missing"
);
//=======================
app.use("/api/chatbot", chatbotRoutes);
