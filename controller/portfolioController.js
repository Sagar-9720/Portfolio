const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");

// Transport
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgunTransport(auth));

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Email content
    const mailOptions = {
      from: "sagar.g123867@gmail.com", // Replace with your sender's email
      to: ["sagar.g123867@gmail.com"], // Replace with your recipient's email
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    };

    // Send email using the created transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Send Email API Error",
          error,
        });
      }

      console.log("Email sent: " + info.response);
      return res.status(200).send({
        success: true,
        message: "Your Message Sent Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
