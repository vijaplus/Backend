import { Request, Response }  from 'express';
import bcrypt from 'bcrypt';
import { asyncHandler } from '../../utils/asyncHandler';
import { requestFields } from '../../utils/validation/requestFields';
import prisma from '../../utils/db';
import { responseSuccess } from '../../utils/commons/response';
import { encryptToken } from '../../utils/commons/jwt';

const view = asyncHandler(async(req: Request, res: Response) =>{
  const requests = ["email", "password"]
  const fields = Object.keys(req.body)
  requestFields(requests, fields)

  const getInfoUser = await prisma.users.findUnique({
    where:{
      email: req.body.email
    },
  })

  if(!getInfoUser) throw new Error("messageBackend:incorrect_email")
  const checkPass = await bcrypt.compare(req.body.password, getInfoUser.password)
  if(!checkPass)  throw new Error("messageBackend:incorrect_password")
  
  //pass
  const { password, ...user } = getInfoUser;
  const token = encryptToken(user)
  
  res.json(responseSuccess({
    token: token,
    user: user
  }))
})

export default {
  view,
  middleware:[]
};  