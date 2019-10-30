import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import path from "path";
import fetch from "node-fetch";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
// ssr시 서버단에서 작동하는 client에는 @apollo/react-common를 사용
import { ApolloProvider } from "@apollo/react-common";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

import Html from "./Html";
import App from "./App";

// lodable for ssr
const statsFile = path.resolve(
  __dirname,
  "../../../front/src/build/loadable-stats.json",
);
const extractor = new ChunkExtractor({ statsFile });

const frontSsr = async (req, res) => {
  // apollo client for ssr
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:4000/api",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
  // console.log("1");
  const sheet = new ServerStyleSheet();

  // init();
  const SsrApp = (
    <ChunkExtractorManager extractor={extractor}>
      <StyleSheetManager sheet={sheet.instance}>
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </StyleSheetManager>
    </ChunkExtractorManager>
  );

  try {
    const content = await renderToStringWithData(SsrApp);

    const styled = sheet.getStyleTags();
    const state = client.extract();

    // console.log("5");
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();

    const tags = {
      scripts: scriptTags,
      links: linkTags,
      styles: styleTags,
    };

    const html = renderToStaticMarkup(
      <Html content={content} tags={tags} styled={styled} state={state} />,
    );

    res.status(200);
    res.send(`<!doctype html>\n${html}`);
    res.end();
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
};

export default frontSsr;
