import jwt from 'jsonwebtoken';

const privateKey = process.env.JWT_SECRET_KEY

export const encryptToken = (data:any) => {  
  if(!privateKey) return
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24* 7), // 7 Date
    data:data
  }, privateKey);

  return token;
};

export const decryptToken = (token: string) =>{
  if(!privateKey) return
  return jwt.verify(token, privateKey);
};