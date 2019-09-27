// import React, { useContext } from "react";
import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Text } from "components/base";
import FlexContainer from "components/FlexContainer";

import { UrlLink } from "components/CustomLink";

// import { Context, types } from "components/Context";

const Container = styled(FlexContainer)`
  padding: 20px;
`; // SortContainer

const WrapText = styled(Text)`
  &:last-child {
    margin-left: auto;
    color: rgb(122, 42, 176);
  }
`; // SortContainer

const ButtonWrapper = styled.div`
  border-radius: 10px;
  width: 120px;
`; // SortContainer

function BoardListTop() {
  return (
    <Container justify="unset">
      <WrapText>
        <Text link={{ to: "/#" }}>최신순</Text>
      </WrapText>
      <WrapText>
        <Text link={{ to: "/#" }}>인기순</Text>
      </WrapText>
      <WrapText>
        <Text link={{ to: "/#" }}>조회순</Text>
      </WrapText>
      <WrapText>
        <UrlLink to="/board/write">
          <ButtonWrapper>
            <Button fat>글 쓰기</Button>
          </ButtonWrapper>
        </UrlLink>
        {/* {sessionStorage.getItem("access_token") ? (
          <Link to="/board/write">
            <Button fat>Write</Button>
          </Link>
        ) : (
          <Button fat onClick={handleClick}>
            Write
          </Button>
        )} */}
      </WrapText>
    </Container>
  );
}

export default BoardListTop;
