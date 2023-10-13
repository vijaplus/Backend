//import library
import express, { Request, Response, NextFunction }  from 'express';
import dotenv  from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// import path handle all file
import routers from './routers/index.ts';
import { responseFailed } from './utils/commons/response.ts';

dotenv.config();
const app: any = express();

// express middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("storage"));
app.use(cors());

// routers
routers.forEach(router =>{
  app[router.method](router.path, router.controller.middleware, router.controller.view);
});

// error in express
app.use((err: any, req: Request, res: Response, next: NextFunction) => {  
  if(err.message) return res.json(responseFailed(err.message));
});

export default app;