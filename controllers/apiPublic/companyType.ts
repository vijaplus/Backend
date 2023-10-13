import { Request, Response }  from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { responseSuccess } from '../../utils/commons/response';

const view = asyncHandler(async(req: Request, res: Response) => {
  res.json(responseSuccess([
    {
      id: "0",
      item: "STARTUPS"
    },
    {
      id: "1",
      item: "INVESTORS"
    },
  ]))
})

export default {
  view,
  middleware:[]
};  