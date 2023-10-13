
import { Request, Response }  from 'express';
import prisma from '../../utils/db';
import { asyncHandler } from '../../utils/asyncHandler';
import { responseSuccess } from '../../utils/commons/response';
import { startupAuthor } from '../../middlewares/author';

const view = asyncHandler(async(req: Request | any, res: Response) => {
  const userInfo = await prisma.users.findUnique({
    where:{
      id: req.userInfo.id
    }
  })
  if(!userInfo) throw new Error("There is something wrong!")
  const {password, ...user} = userInfo
  res.json(responseSuccess(user))
})

export default {
  view,
  middleware:[
    startupAuthor
  ]
};  