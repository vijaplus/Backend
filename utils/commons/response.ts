
// export json return to client data Failed
export const responseFailed = (message: string) => {  
  return {
    "status": false,
    "message": "Something went wrongs!",
    "errors": message
  };
};    
 // export json return to client data Success
export const responseSuccess = (data: any) => {
  return {
    "status": true,
    "data": data
  };        
};
    