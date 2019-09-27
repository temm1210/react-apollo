import React, { useContext } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { Icon } from "components/base";
import { Context, types } from "components/Context";
import MenuList from "containers/MenuListContainer";

const MobileMenuListContainer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  flex-direction: column;
  width: 8rem;
  height: 100vh;
  background-color: white;
  font-size: ${props => props.theme.FontSize.small}px;
  color: black;
  padding: 2rem 1.5rem;
  /* right는 width+ padding+ margin */
  right: ${props => (props.isClick ? "0px" : "-11rem")};
  transition: right 0.3s;

  box-shadow: 1px 0 1px rgba(0, 0, 0, 0.7);

  ${props => props.theme.tablet({ display: "flex" })}
`;

function MobileMenuList() {
  const { state, dispatch } = useContext(Context);

  const handleClick = () => {
    dispatch({ type: types.SET_CLICK });
  };
  return (
    <MobileMenuListContainer isClick={state.isClick}>
      <Icon icon="times" onClick={handleClick} />
      <MenuList />
    </MobileMenuListContainer>
  );
}

MobileMenuList.propTypes = {
  // isClick: PropTypes.bool.isRequired,
  // setIsClick: PropTypes.func.isRequired,
};

export default MobileMenuList;
