const nodemailer = require("nodemailer");

const client = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sender = {
  name: "GuestPostingCompany",
  address: process.env.EMAIL_USER,
};

module.exports = { client, sender };
