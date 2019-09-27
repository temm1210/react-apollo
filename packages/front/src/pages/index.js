/* eslint-disable */
import React, { useContext } from "react";
import loadable from "@loadable/component";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { Context, types } from "components/Context";

function Pages() {
  return (
    <Switch>
      <Route exact path="/" component={loadable(() => import("./HomePage"))} />
      <Route
        exact
        path="/board"
        component={loadable(() => import("./Board/BoardHomePage"))}
      />
      <Route
        exact
        path="/board/:id(\d+)"
        component={loadable(() => import("./Board/BoardReadPage"))}
      />

      <PrivateRoute
        path="/board/write"
        component={loadable(() => import("./Board/BoardWritePage"))}
      />

      <PrivateRoute
        path="/board/modify/:id(\d+)"
        component={loadable(() => import("./Board/BoardModifyPage"))}
      />
    </Switch>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch } = useContext(Context);
  const isWindow = typeof sessionStorage !== "undefined";

  return (
    <Route
      {...rest}
      render={props =>
        isWindow && sessionStorage.getItem("access_token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: state.lastUrl,
              state: dispatch({ type: types.OPEN_LOG_MODAL }),
            }}
          />
        )
      }
    />
  );
};

export default Pages;
