import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import MenuList from "components/pages/Template/Header/Menu/MenuList";

// import { clientSchemaName } from "apollo/types";

// cahce의 data밑의 필드값에 바로접근
// user필드에 바로접근해서 username을 가져오라는 뜻
// const GET_USER = gql`
//   {
//     user @client {
//       username
//     }
//   }
// `;

function MenuListContainer() {
  // const { data } = useQuery(GET_USER);
  let username = null;

  if (typeof window !== "undefined") {
    username =
      // (data && data.user && data.user.username) ||
      sessionStorage.getItem("username");
  }

  return <MenuList username={username} />;
}

export default MenuListContainer;
