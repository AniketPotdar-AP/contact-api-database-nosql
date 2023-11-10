const mongoose = require("mongoose");

const contact = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNo: { type: String, required: true },
    }
);

module.exports = mongoose.model("contact", contact);