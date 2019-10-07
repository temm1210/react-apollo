import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import path from "path";
import AplloServer from "back/src/apollo";
import { StaticRouter } from "react-router-dom";
import fetch from "node-fetch";
import express from "express";
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

import Html from "./Html";
import App from "./App";

const port = process.env.PORT || 8000;
const app = express();

// const schemaLink = new SchemaLink({ schema });
const httpLink = createHttpLink({
  uri: `http://localhost:4000/graphql`,
  includeExtensions: true,
  fetch,
});

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.resolve(__dirname, "images")));
app.use(
  express.static(path.resolve(__dirname, "../../../front/src/build"), {
    index: false,
  }),
);

const cache = new InMemoryCache();
const statsFile = path.resolve(
  __dirname,
  "../../../front/src/build/loadable-stats.json",
);
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

    const styled = sheet.getStyleTags();
    const state = client.extract();

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

    console.log("???");
    res.status(200);
    res.send(`<!doctype html>\n${html}`);
    // res.send(`<!DOCTYPE html>${html}`);
    res.end();
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
});

// AplloServer.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(
    `?? Server ready at http://localhost:${port}${AplloServer.graphqlPath}`,
  );
});

// ------------------------------------

// import React from "react";
// // import PropTypes from "prop-types";
// import { renderToStaticMarkup } from "react-dom/server";
// // import AplloServer from "back/src/apollo";
// import { StaticRouter } from "react-router-dom";
// import path from "path";
// import fetch from "node-fetch";
// // import express from "express";
// // import bodyParser from "body-parser";
// import { ApolloLink } from "apollo-link";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
// import { renderToStringWithData } from "@apollo/react-ssr";
// import { ServerStyleSheet, StyleSheetManager } from "styled-components";
// import { ApolloClient } from "apollo-client";
// import { createHttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import resolvers from "apollo/resolvers";
// import types from "apollo/types";

// import Html from "./Html";
// import App from "./App";

// const port = process.env.PORT || 4000;
// // const app = express();

// // const schemaLink = new SchemaLink({ schema });
// const httpLink = createHttpLink({
//   uri: `http://localhost:${port}/graphql`,
//   includeExtensions: true,
//   fetch,
// });

// console.log(
//   "test222:",
//   path.resolve(__dirname, "../../../front/src/build/loadable-stats.json"),
// );
// const cache = new InMemoryCache();
// const statsFile = path.resolve(
//   __dirname,
//   "../../../front/src/build/loadable-stats.json",
// );
// const extractor = new ChunkExtractor({ statsFile });

// const client = new ApolloClient({
//   ssrMode: true,
//   resolvers,
//   typeDefs: types,
//   // link: ApolloLink.from([httpLink]),
//   link: ApolloLink.from([httpLink]),
//   cache,
// });

// // app.use(async (req, res) => {

// const TestApp = async ({ req, res }) => {
//   const sheet = new ServerStyleSheet();

//   console.log("1");
//   const SsrApp = (
//     <ChunkExtractorManager extractor={extractor}>
//       <StyleSheetManager sheet={sheet.instance}>
//         <ApolloProvider client={client}>
//           <StaticRouter location={req.url} context={{}}>
//             <App />
//           </StaticRouter>
//         </ApolloProvider>
//       </StyleSheetManager>
//     </ChunkExtractorManager>
//   );

//   try {
//     console.log("2");
//     const content = await renderToStringWithData(SsrApp);

//     console.log("3");
//     const styled = sheet.getStyleTags();
//     const state = client.extract();

//     const scriptTags = extractor.getScriptTags();
//     const linkTags = extractor.getLinkTags();
//     const styleTags = extractor.getStyleTags();

//     const tags = {
//       scripts: scriptTags,
//       links: linkTags,
//       styles: styleTags,
//     };

//     const html = renderToStaticMarkup(
//       <Html content={content} tags={tags} styled={styled} state={state} />,
//     );

//     console.log("tags:", tags);
//     console.log("content:", content);
//     res.status(200);
//     res.send(`<!doctype html>\n${html}`);
//     res.end();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     sheet.seal();
//   }
// };
// // });

// // AplloServer.applyMiddleware({ app });

// // app.listen({ port }, () => {
// //   console.log(
// //     `?? Server ready at http://localhost:${port}${AplloServer.graphqlPath}`,
// //   );
// // });

// // TestApp.propTypes = {
// //   sheet: PropTypes.object.isRequired,
// //   req: PropTypes.object.isRequired,
// //   extractor: PropTypes.object.isRequired,
// // };

// export default TestApp;
