import React from "react";
import { ThemeProvider } from "styled-components";
import Pages from "pages";

import ContextProvider from "components/Context";
import { theme, GlobalStyle, media } from "./StyledUtils";

import "./fontawesome";

function App() {
  return (
    <ContextProvider>
      <ThemeProvider theme={{ ...theme, ...media }}>
        <React.Fragment>
          <GlobalStyle />
          <Pages />
        </React.Fragment>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
