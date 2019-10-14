import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import schemaName from "back/src/apollo/user/schemaName";

// import { Loading } from "components/base";
import { LoginModal } from "components/pages/Auth/Modal";

// 서버로부터 쿼리이름을 가져와서 저장
const userLogin = schemaName.mutation.USER_LOGIN;

// Apollo server로 요청할 Mutation
// 로그인 성공시 밑에정의된 필드를 쿼리이름을 키값으로 해서전달
const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    ${userLogin} (email: $email, password: $password) {
      email
      username
      user_pic
      create_date
      update_date
      access_token
      refresh_token
    }
  }
`;

function LoginModalContainer({ onClose }) {
  const isWindow = typeof sessionStorage !== "undefined";
  const [loginMutation, { loading, error, data }] = useMutation(
    LOGIN_MUTATION,
    {
      // 서버에서 데이터를 리턴해주면 해당데이터는 쿼리이름을 키값으로가지는
      // 오브젝트
      onCompleted: queryResult => {
        const user = queryResult && queryResult[userLogin];
        if (user) {
          if (typeof window !== "undefined" && isWindow) {
            sessionStorage.setItem("access_token", user.access_token);
            sessionStorage.setItem("refresh_token", user.refresh_token);
            sessionStorage.setItem("username", user.username);
            window.location.reload();
          }
        }
      },
      // update가 먼저 일어나고 onCOmpleted가 일어남
      update: (cache, { data: { queryResult } }) => {
        const user = queryResult && queryResult[userLogin];
        if (user) cache.writeData({ data: { user } });
      },
    },
  );

  const handleSubmit = value => {
    loginMutation({ variables: value });
  };

  if (error) return <div>{error}</div>;
  const isWarning = !!(data && !data[userLogin]) || false;

  return (
    <>
      <LoginModal
        isWarning={isWarning}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {/* {loading && <Loading />} */}
    </>
  );
}

LoginModalContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default LoginModalContainer;
