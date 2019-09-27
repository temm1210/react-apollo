import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import PropTypes from "prop-types";

const IconContainer = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: ${props => props.iconsize};
  font-weight: unset;
`;

function Icon({ icon, iconsize, onClick, ...rest }) {
  const iconContainer = useMemo(
    () => (
      <IconContainer
        {...rest}
        onClick={onClick}
        icon={icon}
        iconsize={iconsize}
      />
    ),
    [],
  );
  return iconContainer;
}

Icon.defaultProps = {
  iconsize: "16px",
  onClick: null,
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconsize: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
