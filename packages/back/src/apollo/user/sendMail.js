import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const options = {
  service: "SendGrid",
  auth: {
    api_user: process.env.sendgrid_user,
    api_key: process.env.sendgrid_password,
  },
};
const transporter = nodemailer.createTransport(sgTransport(options));

export default async ({ email, authKey }) => {
  const sendInfo = {
    from: "Portfolio temm1210@gmail.com",
    to: email,
    subject: "Portfolio site Authentication Key for sign up",
    html: `<div>This is email for Authentication. Copy and Paste this key on Portfolio site
            <div><h2 style={{color:"blue"}}>${authKey}</h2></div>
          </div>`,
  };

  return transporter.sendMail(sendInfo);
};
