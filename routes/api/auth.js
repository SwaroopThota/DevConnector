const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const config = require("config");
const jsonwebtoken = require("jsonwebtoken");

//@method GET /api/auth
//@desc get user details
//@access pirvate
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//@method POST /api/auth
//@desc Create user
//@access public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const JWT_SECRET = config.get("jwtSecret");
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jsonwebtoken.sign(payload, JWT_SECRET, {
        expiresIn: "10d",
      });
      res.json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
