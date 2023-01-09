const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const adminBinRequest = require("../emails/adminBinRequest");
const clientBinRequest = require("../emails/clientBinRequest");

router.post("/", async (req, res) => {
  const { email, type, id } = req.body;
  const binType = type == "glass" ? "Υαλικών" : type == "clothes" ? "Ρουχισμού" : "Μπαταρίας";
  const html = clientBinRequest({ email, binType });
  const url = `192.168.1.20:3000/check-bins/${id}`;
  const htmlToAdmin = adminBinRequest({ email, binType, url });
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

  let mailToAdminOptions = {
    from: "panagiwtismaniatakos@yahoo.gr",
    to: "panagiwtismaniatakos@icloud.com",
    subject: "New Bin Request",
    html: htmlToAdmin,
  };
  smtpTransport.sendMail(mailToAdminOptions, async (err, info) => {
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
