const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// ================= MONGODB =================
const client = new MongoClient("mongodb://127.0.0.1:27017");

// ================= EMAIL =================
const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "komallondhe083@gmail.com",
    pass: "ykvv rugm ryjg cgqj"
  }
});

// ================= PROFILE =================
app.post("/profile", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("authentication");
    const users = db.collection("users");

    const user = await users.findOne({
      _id: new ObjectId(req.body.userId)
    });

    if (!user) return res.status(404).send("User not found");

    res.json({
      email: user.username,
      verified: user.verified
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// ================= SIGNUP =================
app.post("/save", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("authentication");
    const users = db.collection("users");

    const { username, password1 } = req.body;

    const exists = await users.findOne({ username });
    if (exists) return res.send("User already exists");

    const hashedPassword = await bcrypt.hash(password1, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await users.insertOne({
      username,
      password: hashedPassword,
      otp,
      verified: false
    });

    await mailer.sendMail({
      from: "komallondhe083@gmail.com",
      to: username,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}`
    });

    res.send("saved");

  } catch (err) {
    console.log("SIGNUP ERROR ❌", err);
    res.status(500).send("Server Error");
  }
});

// ================= VERIFY =================
app.post("/verify", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("authentication");
    const users = db.collection("users");

    const { username, otp } = req.body;

    const user = await users.findOne({ username });
    if (!user) return res.send("User not found");

    if (user.verified) return res.send("Already verified");

    if (user.otp !== otp) return res.send("Invalid OTP");

    await users.updateOne(
      { username },
      {
        $set: { verified: true },
        $unset: { otp: "" }
      }
    );

    res.send("verified");

  } catch (err) {
    console.log("VERIFY ERROR ❌", err);
    res.status(500).send("Server Error");
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("authentication");
    const users = db.collection("users");

    const { email, password } = req.body;

    const user = await users.findOne({ username: email });
    if (!user) return res.status(400).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Invalid password");

    if (!user.verified) return res.status(400).send("Email not verified");

    res.json({
      user: {
        _id: user._id,
        email: user.username
      }
    });

  } catch (err) {
    console.log("LOGIN ERROR ❌", err);
    res.status(500).send("Server error");
  }
});

// ================= SERVER =================
app.listen(9000, () => {
  console.log("✅ Server running on port 9000");
});
