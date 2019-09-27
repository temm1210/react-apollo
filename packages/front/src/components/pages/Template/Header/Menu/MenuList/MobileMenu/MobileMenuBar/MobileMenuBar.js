import React, { useContext } from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { Icon } from "components/base";
import { Context, types } from "components/Context";

const MenuBarContainer = styled.div`
  display: none;
  margin: 0 10vw;
  cursor: pointer;
  font-size: ${props => props.theme.FontSize.small}px;
  color: inherit;
  ${props => props.theme.tablet({ display: "block" })};
`;

/**
 * @brief -햄버거 모양 버튼을 만들어주는 컴포넌트.
 */
function MobileMenuBar() {
  const { dispatch } = useContext(Context);

  const handleClick = () => {
    dispatch({ type: types.SET_CLICK });
  };
  return (
    <MenuBarContainer onClick={handleClick}>
      <Icon icon="bars" iconsize="22px" />
    </MenuBarContainer>
  );
}
MobileMenuBar.propTypes = {
  // setIsClick: PropTypes.func.isRequired,
};
export default MobileMenuBar;
