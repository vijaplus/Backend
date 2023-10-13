import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { asyncHandler } from '../../utils/asyncHandler'
import { requestFields } from '../../utils/validation/requestFields'
import { decryptToken } from '../../utils/commons/jwt'
import prisma from '../../utils/db'
import { responseSuccess } from '../../utils/commons/response'

const view = asyncHandler(async(req: Request, res: Response) => {
  const requests = ["user_id", "token", "password_new"]
  const fields = Object.keys(req.body)
  requestFields(requests, fields)
  
  const decryptUser: any = decryptToken(req.body.token)
  if(decryptUser.data.id == req.body.user_id) {
    const encrypt_pass_new =  await bcrypt.hash(req.body.password_new, 10);

    await prisma.users.update({
      where:{
        id: decryptUser.data.id
      },
      data:{
        password: encrypt_pass_new
      }
    })

    return res.json(responseSuccess("Success"))
  }else{
    throw new Error("There is something wrong!")
  }
})

export default {
  view,
  middleware:[]
}