/* eslint-disable react/no-danger */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import path from "path";
// import AplloServer from "back/src/apollo";
import { StaticRouter } from "react-router-dom";
import fetch from "node-fetch";
import express from "express";
// import bodyParser from "body-parser";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import resolvers from "apollo/resolvers";

import types from "apollo/types";
import { onError } from "apollo-link-error";
import { setContextHeader } from "apollo/helpers";
import { getTokenOperation, jwt_token_type } from "apollo/constant";
import App from "./App";

const app = express();

// const schemaLink = new SchemaLink({ schema });
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  includeExtensions: true,
  fetch,
});

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../build"), { index: false }));

const cache = new InMemoryCache();

const statsFile = path.resolve(__dirname, "../build/loadable-stats.json");
const extractor = new ChunkExtractor({ statsFile });

const client = new ApolloClient({
  ssrMode: true,
  resolvers,
  typeDefs: types,
  // link: ApolloLink.from([httpLink]),
  link: ApolloLink.from([httpLink]),
  cache,
});

app.use(async (req, res) => {
  const sheet = new ServerStyleSheet();

  const ClientApp = (
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
    const content = await renderToStringWithData(ClientApp);

    // await getDataFromTree(ClientApp);
    const styled = sheet.getStyleTags();
    const state = client.extract();

    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();
    // const content = renderToString(ClientApp);

    const tags = {
      scripts: scriptTags,
      links: linkTags,
      styles: styleTags,
    };

    // const content = renderToStaticMarkup(ClientApp);
    // const html = Html({ content, tags, styled, state });

    const html = renderToStaticMarkup(
      <Html2 content={content} tags={tags} styled={styled} state={state} />,
    );

    res.status(200);
    res.send(html);
    // res.send(`<!DOCTYPE html>${html}`);
    res.end();
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
});

const port = process.env.PORT || 8000;

// AplloServer.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

function Html2({ content, tags, styled, state }) {
  const styles = styled.replace(/(\/\*[^*]*\*\/)/g, "");

  const head = `
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
      <title>React App</title>
      ${tags.styles}
      ${tags.links}
      ${styles}
  `;

  const scripts = `

  `;

  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c",
            )}`,
          }}
        />
        <script />
      </body>
    </html>
  );
}
