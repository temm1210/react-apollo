import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MenuList from "components/pages/Template/Header/Menu/MenuList";

// import { clientSchemaName } from "apollo/types";

// cahce의 data밑의 필드값에 바로접근
// user필드에 바로접근해서 username을 가져오라는 뜻
const USER = gql`
  query {
    user @client {
      username
    }
  }
`;

function MenuListContainer() {
  const { data } = useQuery(USER);
  const username = data && data.user && data.user.username;

  return <MenuList username={username} />;
}

export default MenuListContainer;
