import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:  process.env.ACCOUNT_EMAIL,
    pass: process.env.ACCOUNT_PASSWORD
  }
});


 