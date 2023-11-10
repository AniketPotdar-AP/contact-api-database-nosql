const express = require("express");
const Contact = require("../models/contactModel");
const { body, validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

router.post("/createContact", [
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("phoneNo").not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0],
            });
        }

        const contactDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
        };

        const newContact = new Contact(contactDetails);
        newContact.save().then((result) => {
            return res.status(200).json({ msg: "Contact Created Successfully!!!", details: result });
        }).catch((error) => {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        });
    }
);

/*=======================================================
                    Get All Contact Data
=========================================================*/

router.get("/getContacts", async (req, res) => {
    try {
        const getContact = await Contact.find({});
        res.send(getContact);
    } catch (e) {
        res.send(e);
    }
});

/*=======================================================
                    Get Contact by ID
=========================================================*/

router.get("/getContact/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        if (!ObjectId.isValid(_id)) {
            return res.status(400).send(`No records with given id : ${_id}`);
        }

        const getContact = await Contact.findById({ _id });
        res.status(200).send(getContact);

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

/*=======================================================
                    Update Contact
=========================================================*/

router.put("/updateContact/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const updateContact = await Contact.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateContact);
    } catch (e) {
        res.status(500).send(e);
    }
});

/*=======================================================
                    Delete Contact
=========================================================*/

router.delete("/deleteContact/:id", async (req, res) => {
    try {
        const deleteContact = await Contact.findByIdAndDelete(req.params.id)
        res.send(deleteContact);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;