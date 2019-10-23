import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import schemaName from "back/src/apollo/user/schemaName";
// import { Loading } from "components/base";
import EmailForm from "components/pages/Auth/Modal/SignupModal/SignupForm/EmailForm";

// 쿼리네임
const getUserByEmail = schemaName.query.GET_USER_BY_EMAIL;
const sendAuthKey = schemaName.mutation.SEND_AUTH_KEY;
const isMatchAuthKey = schemaName.mutation.IS_MATCH_AUTH_KEY;

// 실행할 쿼리
const GET_USER_BY_EMAIL = gql`
  query GET_USER_BY_EMAIL($email: String!) {
    ${getUserByEmail}(email: $email) {
      email
    }
  }
`;

const SEND_AUTH_KEY = gql`
  mutation SEND_AUTH_KEY($email: String!) {
    ${sendAuthKey}(email: $email)
  }
`;

const IS_MATCH_AUTH_KEY = gql`
  mutation IS_MATCH_AUTH_KEY($authKey: String!) {
    ${isMatchAuthKey}(authKey: $authKey)
  }
`;

function EmailFormContainer({ onSubmit }) {
  const apolloClient = useApolloClient();

  // 이메일 중복체크
  const onSubmitEmailDuplicated = async email => {
    const { data } = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });
    return data[getUserByEmail] && !!data[getUserByEmail].email;
  };

  // 중복체크 성공하면 인증키를 보냄
  const onSubmitSendAuthKey = async email => {
    apolloClient.mutate({
      mutation: SEND_AUTH_KEY,
      variables: { email },
    });
  };

  // 인증키가 올바른지 검증하는 로직
  const onSubmitMatchAuthKey = async authKey => {
    const { data } = await apolloClient.mutate({
      mutation: IS_MATCH_AUTH_KEY,
      variables: { authKey },
    });
    return data && data[isMatchAuthKey];
  };

  return (
    <>
      <EmailForm
        onSubmit={onSubmit}
        onSubmitMatchAuthKey={onSubmitMatchAuthKey}
        onSubmitSendAuthKey={onSubmitSendAuthKey}
        onSubmitEmailDuplicated={onSubmitEmailDuplicated}
      />
      {/* {loading && <Loading />} */}
    </>
  );
}

EmailFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EmailFormContainer;
