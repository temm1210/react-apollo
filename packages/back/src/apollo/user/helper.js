import crypto from "crypto";
import jwt from "jsonwebtoken";

const { jwt_secret } = process.env;

function generateSalt() {
  // salt생성
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      // console.log(`${buf.length} bytes of random data: ${buf.toString("hex")}`);
      resolve(buf.toString("hex"));
    });
  });
}

function makeScryptPwd(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function generatePasswdScrypt(password, userSalt) {
  try {
    const salt = userSalt || (await generateSalt());
    const scryptPasswd = await makeScryptPwd(password, salt);
    return { salt, scryptPasswd };
  } catch (err) {
    console.error(`generatePasswdScrypt Error ${err}`);
    throw err;
  }
}

// secret key대신에 salt를 써도 됨
export function generateToken(email, salt, expireTime) {
  const token = jwt.sign({ data: email }, salt, {
    expiresIn: expireTime,
  });
  return token;
}

// access_token, refresh_token발급
export function getAccessRefreshToken(data) {
  return {
    // aceess_token은 유효기간 1시간
    access_token: generateToken(data, jwt_secret, 60 * 60),
    // refresh_token은 유효기간 2주
    refresh_token: generateToken(data, jwt_secret, 60 * 60 * 24 * 14),
  };
}

export function makeAuthenticationkey(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// jwt_secret
