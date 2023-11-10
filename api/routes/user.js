const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = express.Router();

/*=======================================================
                        Login
=========================================================*/

router.post("/login", [body("email").not().isEmpty(), body("password").not().isEmpty()], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0],
        });
    }

    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        bcrypt.compare(req.body.password, emailExist.password, (error, result) => {
            if (error) { return res.status(401).json(error) }
            if (result == true) {
                let token = jwt.sign({ email: emailExist.email }, "secret", {
                    expiresIn: "90d",
                });
                emailExist.save().then(() => {
                    return res.status(200).json({ status: 200, email: emailExist.email, token, role: emailExist.role })
                }).catch((error) => {
                    return res.status(404).json({ error, message: "Something went wrong" })
                });
            } else if (result == false) {
                res.status(401).json({ error: "Invalid password" });
            } else {
                res.status(401).json({ error: "Please Enter valid credentials" });
            }
        })
    } else {
        res.status(401).json({ error: "Email Not Exist" });
    }
})

/*=======================================================
                     Create User Data
=========================================================*/

router.post("/register", [body("email").isEmail(), body("email").not().isEmpty(), body("password").not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0],
            });
        }

        const emailExist = await User.findOne({ email: req.body.email });

        if (emailExist) return res.status(401).json({ error: "User with the E-mail already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userDetails = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        };

        const newUser = new User(userDetails);
        newUser.save().then((result) => {
            return res.status(200).json({ msg: "User Registered Successfully!!!", details: result });
        }).catch((error) => {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        });
    }
);

module.exports = router;