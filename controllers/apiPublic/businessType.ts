import { Request, Response }  from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { responseSuccess } from '../../utils/commons/response';
import prisma from '../../utils/db';

interface props {
  id: number,
  name: string,
}

interface props {
  business_type_id? : number,
  items?: any,
}

const view = asyncHandler(async(req: Request, res: Response) => {
  
  const businessType:props[] = await prisma.business_type.findMany({
    select:{
      id: true,
      name: true
    }
  })
  
  const businessField:props[] = await prisma.business_field.findMany({
    select:{
      id: true,
      name: true,
      business_type_id: true
    }
  })

  const results:props[] = []

  businessType.forEach( (type) => {
    const result:props = {
      id: type.id,
      name: type.name,
      items: []
    }
    results.push(result)
    businessField.forEach( field => {
      if(type.id == field.business_type_id){
        result.items.push(field)
      }
    })
  })
  res.json(responseSuccess(results))
})

export default {
  view,
  middleware:[]
};  