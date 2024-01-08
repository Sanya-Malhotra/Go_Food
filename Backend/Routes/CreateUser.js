const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "Mynameissujal"; // Consider storing sensitive info like this in environment variables

router.post(
  "/createuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPassword,
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: "Error creating user" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Invalid credentials. User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ errors: "Invalid credentials. Incorrect password" });
      }

      const payload = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(payload, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: "Error logging in" });
    }
  }
);

module.exports = router;
