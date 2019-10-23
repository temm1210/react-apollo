// import { ForbiddenError } from "apollo-server-express";
import { userFields } from "db/schemas";
import sendMail from "./sendMail";
import resolver from "./schemaName";
// import makeAuthenticationkey from "./makeAuthenticationkey";
import {
  generatePasswdScrypt,
  getAccessRefreshToken,
  makeAuthenticationkey,
} from "./helper";

let generatedAuthKey = null;

export default {
  Query: {
    /**
     * @brief  이메일을 입력받아 해당하는 유저를 리턴.
     * @param {email} string 찾고싶은 유저의 이메일
     * @returns {user} 해당하는 이메일의 유저
     */
    [resolver.query.GET_USER_BY_EMAIL]: (
      _,
      { email },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.getUser({ [userFields.EMAIL]: email });
    },

    [resolver.query.GET_USER_BY_UESRNAME]: async (
      _,
      { username },
      { dataSources: { userAPI } },
    ) => {
      const user = await userAPI.getUser({ [userFields.USERNAME]: username });

      return !!user;
    },

    /**
     * @brief  이메일에 해당하는 유저에게 토큰발급
     * @param {email} string 토큰을 발급할 이메일
     * @returns {object} refresh_token,access_token을 발급
     */
    [resolver.query.GET_NEW_TOKEN]: async (
      _,
      { email },
      { dataSources: { userAPI } },
    ) => {
      const user = await userAPI.getUser(email);
      const { email: userEmail } = user;

      return getAccessRefreshToken(userEmail);
    },
  },

  Mutation: {
    /**
     * @brief  파라미터를 입력받아 DB에 회원정보를 저장함.
     * @param {user} object 유저가 입력한 유저정보
     * @returns {Boolean} 유저정보가 제대로 저장되면 true, 아니면 false를 반환
     */
    [resolver.mutation.INSERT_USER]: async (
      _,
      { user },
      { dataSources: { userAPI } },
    ) => {
      let i = 0;
      while (i < 500000000) {
        i += 1;
      }
      let userData = user;
      // 비밀번호는 암호화해서 salt값과 같이 DB에 저장
      const scryptPwd = await generatePasswdScrypt(user.password);

      // 프로필 사진을 등록하지 않았다면, null을 대입
      const user_pic = userData[userFields.USER_PIC];
      userData = !user_pic && { ...userData, [userFields.USER_PIC]: null };

      // 최종 DB에 저장될 user 데이터
      const newUser = {
        ...userData,
        [userFields.PASSWORD]: scryptPwd.scryptPasswd,
        [userFields.SALT]: scryptPwd.salt,
      };
      const result = await userAPI.insertUser(newUser);
      return !!result;
    },

    /**
     * @brief  이메일을 입력받아 해당 이메일로 인증키를 보냄.
     * @param {email} string 회원가입할때 유저가 입력한 이메일
     * @returns {Boolean} 인증이 제대로 보내졌다면 true, 아니면 false
     */
    [resolver.mutation.SEND_AUTH_KEY]: async (_, { email }) => {
      generatedAuthKey = makeAuthenticationkey(8);
      const result = await sendMail({ email, authKey: generatedAuthKey });
      return result.message === "success" || false;
    },

    /**
     * @brief  회원가입할때 이메일로 보냈던 인증키가 맞는지 인증하는 작업.
     * @param {authKey} string 이메일로 보냈던 인증키
     * @returns {Boolean} 인증이 제대로 보내졌다면 true, 아니면 false
     */
    [resolver.mutation.IS_MATCH_AUTH_KEY]: (_, { authKey }) => {
      if (authKey === generatedAuthKey) {
        generatedAuthKey = null;
        return true;
      }
      return false;
    },

    /**
     * @brief  이메일, 패스워드를 입력받아 로그인을 실행
     * @param {email} string 회원가입할때 유저가 입력한 이메일
     * @param {password} string 회원가입할때 유저가 입력한 이메일
     * @returns {user} userType타입의 object를 반환
     */
    [resolver.mutation.USER_LOGIN]: async (
      _,
      { email, password },
      { dataSources: { userAPI } },
    ) => {
      let i = 0;
      while (i < 500000000) {
        i += 1;
      }
      const user = await userAPI.getUser({ [userFields.EMAIL]: email });
      // 주어진 이메일에 해당하는 유저가 없다면 return null
      if (!user) return null;

      const salt = user[userFields.SALT];
      const passwd = user[userFields.PASSWORD];
      const userEmail = user[userFields.EMAIL];
      const { scryptPasswd } = await generatePasswdScrypt(password, salt);

      if (passwd === scryptPasswd) {
        const { access_token, refresh_token } = getAccessRefreshToken(
          userEmail,
        );

        // 첫번쨰 인자는 바꿀유저의 eamil, 두번째인자는 바꿀 필드의 객체
        userAPI.updateUser(email, { refresh_token });
        return { ...user, access_token, refresh_token };
      }

      // 이메일에 해당하는 비밀번호와 틀릴시 return null
      // console.log("login fail");
      return null;
    },
  },
};
