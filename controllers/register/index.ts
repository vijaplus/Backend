import { Request, Response }  from 'express';
import bcrypt from 'bcrypt';
import { requestFields } from '../../utils/validation/requestFields';
import prisma from '../../utils/db';
import { asyncHandler } from '../../utils/asyncHandler';
import { responseSuccess } from '../../utils/commons/response';
import { checkFormatEmail, checkFormatPhone } from '../../utils/validation/checkInputReq';
import { encryptToken } from '../../utils/commons/jwt';


const view = asyncHandler(async(req: Request, res: Response) => {
  const requests = [
    "email",
    "password", 
    "phone_number_country", 
    "phone_number_digit", 
    "name", 
    "company_name", 
    "company_type",
    "business_type_id"
  ]
  const fields = Object.keys(req.body)

  requestFields(requests, fields)
  checkFormatEmail(req.body.email)
  checkFormatPhone(req.body.phone_number_digit)

  const emailExist = await prisma.users.findUnique({
    where:{
      email: req.body.email
    }
  })

  if(emailExist) throw new Error("messageBackend:email_already_exists")

  const phoneExist = await prisma.users.findFirst({
    where: {
      phone_number_country: req.body.phone_number_country ,
      phone_number_digit: req.body.phone_number_digit,
    },
  })

  if(phoneExist) throw new Error("messageBackend:phone_already_exists")

  //pass
  const encrypt_pass =  await bcrypt.hash(req.body.password, 10);

  if(req.body.company_type == 0) req.body.company_type = "STARTUPS"
  if(req.body.company_type == 1) req.body.company_type = "INVESTORS"

  const setInfoUser = await prisma.users.create({
    data: {
      email: req.body.email,
      password: encrypt_pass,
      name: req.body.name,
      company_name: req.body.company_name,
      company_type: req.body.company_type,      
      phone_number_country: req.body.phone_number_country,
      phone_number_digit: req.body.phone_number_digit,
      business_type_id: parseInt(req.body.business_type_id)
    },
  })

  const {password, ...user } = setInfoUser;
  res.json(responseSuccess({
    user: user
  }))
})

export default {
  view,
  middleware:[]
};  