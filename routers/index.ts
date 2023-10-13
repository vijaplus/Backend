import userInfo from '../controllers/userInfo/index.ts';
import publicRoutes from './publicRoutes/index,.ts';
import authRoutes from './authRoutes/index.ts';

export default [
  {
    method: "post",
    path:"/api/user-info",
    controller: userInfo
  },
  ...authRoutes,
  ...publicRoutes,
//   ...investorsRoutes,
//   ...startupsRoutes
]