import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
// common여기다 쓰면 에러발생. 버그있음
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClient, { init } from "apollo";

import App from "./App";

init();

const Root = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

if (process.env.NODE_ENV === "production") {
  loadableReady(() =>
    ReactDOM.hydrate(<Root />, document.getElementById("root")),
  );
} else {
  ReactDOM.render(<Root />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
