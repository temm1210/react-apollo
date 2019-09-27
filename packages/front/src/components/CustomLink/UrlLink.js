import React, { useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context, types } from "components/Context";

const UrlLink = withRouter(({ location, to, children }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({ type: types.SET_LAST_URL, lastUrl: location.pathname });
  }, []);
  return <Link to={to}>{children}</Link>;
});

UrlLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default UrlLink;
