import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalPortal from "./ModalPortal";

function Modal({ children, ...rest }) {
  const root = document.getElementById("root");

  return ReactDOM.createPortal(
    <ModalPortal {...rest}>{children}</ModalPortal>,
    root,
  );
}

Modal.defaultProps = {
  onClose: null,
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element, PropTypes.node),
  ]).isRequired,
};

export default Modal;
