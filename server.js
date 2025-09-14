// server.js
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Contact form route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ success: false, message: "Gmail password not set in environment." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chaureganesh518@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: "chaureganesh518@gmail.com",
    to: "chaureganesh518@gmail.com",
    subject: `New Message from ${name}`,
    text: message,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

// Default route - serve contact.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Use Render-provided port or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
