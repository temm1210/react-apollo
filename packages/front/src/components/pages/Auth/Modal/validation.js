const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const emailValidation = email => !email.match(emailReg);
export const authCodeValidation = code => !(code.length > 3);
export const passwdValidation = passwd => !(passwd.length > 3);
export const usernameValidation = username => !(username.length > 3);
