const nodemailer = require("nodemailer");
"use strict";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

class SendOtp{

  static otp = async (new_user) =>{
    try{

        // let testAccount = await nodemailer.createTestAccount();
      
        let transporter = nodemailer.createTransport({
          host:"smtp.mailtrap.io",
          port:587,           
          auth: {
            user: "091701a906439b",
            pass: "4555d7bf264223"
          },
        });
       
        let info = await transporter.sendMail({
          from: '"from INA TEAM 👻" <INA@INA-TEAM.EG>',  
          to: new_user.email,  
          subject: "OTP For Reset Password ✔",  
          text: "",  
          html:`
          This mail sent to Activate your account<br> 
          Please Click on next link <br>
          <a href="http://localhost:3000/api/user/active/${new_user.otp}">Click Here</a><br>
          <img width="480px" height="300px" src='https://www.intuity.ie/wp-content/uploads/2021/04/fotolia_78778707_subscription_yearly_m_plus-e1444066448330-1080x675-1.jpg'>  `,  
        });
      
        console.log("Message sent: %s", info.messageId);
 
      }catch(err){  console.log(err)   }
  }
}   
module.exports =SendOtp