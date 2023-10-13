import login from '../../controllers/login/index.ts';
import register from '../../controllers/register/index.ts';
import sendOTPRegister from '../../controllers/authenOTP/sendOTPRegister.ts'
import sendOTPForgotPassword from '../../controllers/authenOTP/sendOTPForgotPassword.ts';
import verifyRegister from '../../controllers/register/verifyRegister.ts';
import verifyForgotPassword from '../../controllers/forgotPassword/verifyForgotPassword.ts';
import resetPasswordNew from '../../controllers/forgotPassword/resetPasswordNew.ts';

const authRoutes = [
  {
    method:"post",
    path:"/api/login",
    controller:login
  },
  {
    method:"post",
    path:"/api/register",
    controller: register
  },
  {
    method:"post",
    path:"/api/send-otp-register",
    controller: sendOTPRegister
  },
  {
    method:"post",
    path:"/api/verify-register",
    controller: verifyRegister
  },
  {
    method:"post",
    path:"/api/send-otp-forgot-password",
    controller: sendOTPForgotPassword
  },
  {
    method:"post",
    path:"/api/verify-forgot-password",
    controller: verifyForgotPassword
  },
  {
    method:"post",
    path:"/api/reset-password-new",
    controller: resetPasswordNew
  },
];

export default authRoutes;