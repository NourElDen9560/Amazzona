"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:"smtp.mailtrap.io", // host: "smtp.ethereal.email",
    port:587,             // port: 587,
    // secure: true, // true for 465, false for other ports
    
    auth: {
      user: "091701a906439b",//testAccount.user, // generated ethereal user
      pass: "4555d7bf264223"//testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"from INA TEAM 👻" <INA@INA-TEAM.EG>',  
    to: "will_be_user_email_next@example.com",  
    subject: "OTP For Reset Password ✔", // Subject line
    text: "", // plain text body
    html: "this mail sent for you to reset your password please follow next link and write this otp <br><br> <b>OTP is: 123456</b> <br><br><a href='https://www.google.com'>Click Here</a> <img src='https://www.intuity.ie/wp-content/uploads/2021/04/fotolia_78778707_subscription_yearly_m_plus-e1444066448330-1080x675-1.jpg'>  ", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
