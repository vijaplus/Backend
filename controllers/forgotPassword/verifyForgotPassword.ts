import { Request, Response }  from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { requestFields } from '../../utils/validation/requestFields';
import prisma from '../../utils/db';
import { responseSuccess } from '../../utils/commons/response';
import { encryptToken } from '../../utils/commons/jwt';


const view = asyncHandler(async(req: Request, res: Response) => {
  const requests = ["user_id", "code_otp"]
  const fields = Object.keys(req.body)
  requestFields(requests, fields)

  const getEmailUser = await prisma.users.findUnique({
    where:{
      id: req.body.user_id
    },
    select:{
      email: true,
    }
  })
  if(!getEmailUser)  throw new Error("messageBackend:email_not_exists")
  
  const expiryCheck  = await prisma.confirm_otp_google.findFirst({
    where: {
      user_id: req.body.user_id,
      code: req.body.code_otp.toString(),
      purpose: 2,
    },
  })
  if(!expiryCheck) throw new Error("messageBackend:invalid_otp")

  const currentTimestamp = Date.now();
  const timestamp = new Date(expiryCheck.created_at).getTime() + 60 * 1000;
  const reset_otp =  timestamp - currentTimestamp
  if(reset_otp < 0 ) throw new Error("messageBackend:otp_expired")

  const updateInfoUser = await prisma.users.update({
    where:{
      id: expiryCheck.user_id
    },
    data:{
      is_verified: true
    }
  })

  await prisma.confirm_otp_google.deleteMany({
    where: {
      purpose: 2,
      user_id: updateInfoUser.id,
    },
  })
  // pass
  const { password, ...user } = updateInfoUser;
  const token = encryptToken(user)
  res.json(responseSuccess({
    token: token,
    user: {
      id: updateInfoUser.id
    }
  }))
})

export default {
  view,
  middleware:[]
}