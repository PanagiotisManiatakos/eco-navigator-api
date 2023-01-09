const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const binAccepted = require("../emails/binAccepted");

router.post("/", async (req, res) => {
  const { email } = req.body;
  const html = binAccepted({ email });
  let mailToClientOptions = {
    from: "panagiwtismaniatakos@yahoo.gr",
    to: email,
    subject: "Thank You",
    html,
  };
  let smtpTransport = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: true,
    debug: false,
    logger: false,
    auth: {
      user: "panagiwtismaniatakos@yahoo.gr",
      pass: "fitjzwsbqesjrhog",
    },
  });
  smtpTransport.sendMail(mailToClientOptions, async (err, info) => {
    if (err) {
      console.log(err);
      smtpTransport.close();
    } else {
      console.log(info);
      smtpTransport.close();
    }
  });

  return res.json({ success: true });
});

module.exports = router;
