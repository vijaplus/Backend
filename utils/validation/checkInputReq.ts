
export function checkFormatEmail(email: string){
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const formatEmail =  regex.test(email);
  if(!formatEmail) throw new Error("messageBackend:invalid_email_format")
  return
}

export function checkFormatPhone(phone: string){
  const regex = /^[0-9]*$/
  const formatPhone =  regex.test(phone);
  if(!formatPhone) throw new Error("messageBackend:invalid_phone_format")
  return
}