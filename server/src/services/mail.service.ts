import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  export const sendVerifyMail = async (to: string, verificationToken:string) => {
    try{
      await transporter.sendMail({
          from: process.env.SMTP_USER,
          to,
          subject:"Verify your email",
          html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        });
    }catch(error){
      console.log("error in sending mail",error);
    }
  };