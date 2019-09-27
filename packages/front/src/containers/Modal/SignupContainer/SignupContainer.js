import React from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import schemaName from "back/src/apollo/user/schemaName";

// import { Loading } from "components/base";
import { SignupModal, ChoiceModal } from "components/pages/Auth/Modal";

// 쿼리네임
const insertUser = schemaName.mutation.INSERT_USER;
const getUsername = schemaName.query.GET_USER_BY_UESRNAME;

// 쿼리이름(insertUser)를 키값으로 회원가입 성공여부(Boolean)을 리턴함
const INSERT_USER = gql`
  mutation INSERT_USER($user: UserInput!) {
    ${insertUser}(user: $user)
  }
`;

const GET_USER_NAME = gql`
  query GET_USER_NAME($username:String!) {
    ${getUsername}(username:$username)
  }
`;

function SingupModalContainer({ onClose }) {
  const [signupMutation, { loading, error, data }] = useMutation(INSERT_USER);
  const apolloClient = useApolloClient();

  const handleSubmit = async user => {
    const {
      data: { getUserByUsername },
    } = await apolloClient.query({
      query: GET_USER_NAME,
      variables: { username: user.username },
    });

    if (getUserByUsername) {
      if (typeof window !== "undefined") {
        return window.alert("이미 존재하는 닉네임 입니다.");
      }
    }
    return signupMutation({ variables: { user } });
  };
  if (error) return <div>{error}</div>;

  return (
    <>
      {data && data[insertUser] ? (
        <ChoiceModal />
      ) : (
        <SignupModal
          loading={loading}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      )}
      {/* {loading && <Loading />} */}
    </>
  );
}

SingupModalContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default SingupModalContainer;
