import otpGenerator from 'otp-generator'

export const OTPGenerator = () => {
  return otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false})
}