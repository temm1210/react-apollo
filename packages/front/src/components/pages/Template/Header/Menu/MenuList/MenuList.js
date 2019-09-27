import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FlexContainer from "components/FlexContainer";
import { Context, types } from "components/Context";
import { Text } from "components/base";
import { UrlLink } from "components/CustomLink";
import userImage from "asset/images/user/user.png";

const LinkWrapper = styled.div`
  margin-left: 1.5rem;
`;

const MenuLink = styled(UrlLink).attrs(props => ({
  activeClassName: "active",
  ...props,
}))`
  font-size: inherit;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  /* for test */
  &.active {
    color: #51beac;
  }
`;

const ProfileImage = styled.img`
  height: 40px;
  margin-top: 3px;
  padding-right: 5px;
`;

const MenuText = styled(Text)`
  color: inherit;
  font-size: 1rem;
  font-weight: bold;
  width: ${props => props.width || "100%"};
`;

function MenuList({ username }) {
  const isWindow = typeof sessionStorage !== "undefined";
  const { dispatch } = useContext(Context);
  const isLogin = (isWindow && sessionStorage.getItem("access_token")) || false;

  const handleClickLogin = () => {
    dispatch({ type: types.OPEN_LOG_MODAL });
  };

  const handleClickSignup = () => {
    dispatch({ type: types.OPEN_SIGNUP_MODAL });
  };

  const handleSignout = () => {
    if (typeof window !== "undefined" && isWindow) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch({ type: types.CLOSE_RESPONSIVE_MENU });
  }, []);
  return (
    <Fragment>
      <LinkWrapper>
        <MenuLink to="/board">
          <MenuText>Board</MenuText>
        </MenuLink>
      </LinkWrapper>

      {isLogin ? (
        <>
          <LinkWrapper>
            <MenuLink exact as="div" onClick={handleSignout}>
              <MenuText width="70px">Sign out</MenuText>
            </MenuLink>
          </LinkWrapper>

          <LinkWrapper>
            <FlexContainer>
              <ProfileImage src={userImage} />
              <MenuText>{username}</MenuText>
            </FlexContainer>
          </LinkWrapper>
        </>
      ) : (
        <>
          <LinkWrapper>
            <MenuLink exact as="span" onClick={handleClickLogin}>
              <MenuText>Login</MenuText>
            </MenuLink>
          </LinkWrapper>

          <LinkWrapper>
            <MenuLink exact as="span" onClick={handleClickSignup}>
              <MenuText>SignUp</MenuText>
            </MenuLink>
          </LinkWrapper>
        </>
      )}
    </Fragment>
  );
}

MenuList.defaultProps = {
  username: "",
};

MenuList.propTypes = {
  username: PropTypes.string,
};
export default MenuList;
