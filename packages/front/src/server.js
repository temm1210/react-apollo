import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import path from "path";
// import fetch from "node-fetch";
// import { ApolloLink } from "apollo-link";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
// import { ApolloProvider } from "@apollo/react-hooks";
// ssr시 서버단에서 작동하는 client에는 @apollo/react-common를 사용
import { ApolloProvider } from "@apollo/react-common";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
// import { createHttpLink } from "apollo-link-http";
// import gql from "graphql-tag";
// import { makeExecutableSchema } from "graphql-tools";
import { schema } from "back/src/apollo";
// import { init } from "apollo";

import Html from "./Html";
import App from "./App";

// lodable for ssr
const statsFile = path.resolve(
  __dirname,
  "../../../front/src/build/loadable-stats.json",
);
const extractor = new ChunkExtractor({ statsFile });

// apollo client for ssr
const client = new ApolloClient({
  ssrMode: true,
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});

// ssr fuc
const frontSsr = async (req, res) => {
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
    // console.log("2");
    const content = await renderToStringWithData(SsrApp);

    // await getDataFromTree(SsrApp);

    // const content = renderToString(SsrApp);
    // console.log("3");
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
