import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexContainer from "components/FlexContainer";
import Menu from "./Menu";

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  z-index: 100;
  transition: background-color 0.3s, padding 0.4s;
  padding: ${props =>
    props.isScroll || props.firstScroll ? "0.7rem 0" : "1.5rem 0"};
  color: ${props => (props.isScroll || props.firstScroll ? "black" : "white")};
  background-color: ${props =>
    props.isScroll || props.firstScroll
      ? "rgba(255,255,255,.9)"
      : "transparent"};
  box-shadow: ${props =>
    props.isScroll || props.firstScroll
      ? "0 0 10px 0 rgba(0, 0, 0, 0.1)"
      : "0"};
`; // HeaderContainer

const NavContainer = styled(FlexContainer)`
  height: 3rem;
  line-height: 3rem;
`; // NavContainer

/**
 * @brief 최상단 메뉴바
 * @param {string} firstScroll. 스크롤효과를 적용시킬지 말지를 정함
 */
function Header({ firstScroll }) {
  // const { state } = useContext(Context);
  const [isScroll, setIsScroll] = useState(false);
  if (typeof window !== "undefined") {
    const scrollCallback = useCallback(() => {
      const scrollPos = window.scrollY;
      const isScrollOver = scrollPos >= 200 || false;
      setIsScroll(isScrollOver);
    }, [window.scrollY]);

    useEffect(() => {
      scrollCallback();

      window.addEventListener("scroll", scrollCallback);
      return () => window.removeEventListener("scroll", scrollCallback);
    }, []);
  }

  return (
    <HeaderContainer firstScroll={firstScroll} isScroll={isScroll}>
      <NavContainer>
        <Menu />
      </NavContainer>
    </HeaderContainer>
  );
}

Header.defaultProps = {
  firstScroll: false,
};

Header.propTypes = {
  firstScroll: PropTypes.bool,
};

export default Header;
