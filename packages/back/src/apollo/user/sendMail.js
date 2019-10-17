import nodemailer from "nodemailer";
// import sgTransport from "nodemailer-sendgrid-transport";

// const options = {
//   // service: "SendGrid",
//   auth: {
//     user: process.env.sendgrid_user,
//     pass: process.env.sendgrid_password,
//   },
// };
// const transporter = nodemailer.createTransport(sgTransport(options));

const transporter = nodemailer.createTransport({
  service: "naver",
  auth: {
    user: process.env.naver_user,
    pass: process.env.naver_password,
  },
});

export default async ({ email, authKey }) => {
  const mailOptions = {
    from: `${process.env.naver_user}@naver.com`,
    to: email,
    subject: "Portfolio site Authentication Key for sign up",
    text: `<div>This is email for Authentication. Copy and Paste this key on Portfolio site
    <div><h2 style={{color:"blue"}}>${authKey}</h2></div>
  </div>`,
  };

  return transporter.sendMail(mailOptions);
};
