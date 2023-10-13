

import { Request, Response }  from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { transporter } from '../../service/nodemailer';
import prisma from '../../utils/db';
import { OTPGenerator } from '../../service/OTPGenerator';
import { requestFields } from '../../utils/validation/requestFields';
import { responseSuccess } from '../../utils/commons/response';

const view = asyncHandler(async(req: Request, res: Response) => {
  const requests = ["email"]
  const fields = Object.keys(req.body)
  requestFields(requests, fields)

  const getEmailUser = await prisma.users.findUnique({
    where:{
      email: req.body.email
    },
    select:{
      id: true,
      email: true,
    }
  })
  if(!getEmailUser)  throw new Error("messageBackend:email_not_exists")

  const spam_otp  = await prisma.confirm_otp_google.findFirst({
    where: {
      user_id: getEmailUser.id,
      purpose: 2
    },
  })  
  if(spam_otp){
    const currentTimestamp = Date.now();
    const timestamp = new Date(spam_otp.created_at).getTime() + 60 * 1000;
    const reset_otp =  timestamp - currentTimestamp
    if(reset_otp >= 0 ) throw new Error("messageBackend:otp_resent_1")
    await prisma.confirm_otp_google.deleteMany({
      where: {
        user_id: getEmailUser.id,
        purpose: 2,
      },
    })
  }

  const CodeOTP = OTPGenerator()
  
  await prisma.confirm_otp_google.create({
    data: {
      code: CodeOTP,
      purpose: 2,  
      user_id: getEmailUser.id
    },
  })
  
  await transporter.sendMail({
    from: process.env.ACCOUNT_EMAIL,
    to: getEmailUser.email, 
    subject: "[vijaplus]Email verification", 
    text: `OTP của bạn là: ${CodeOTP}`,
  });
  
  res.json(responseSuccess({
    user: getEmailUser
  }))
})

export default {
  view,
  middleware:[]
};  