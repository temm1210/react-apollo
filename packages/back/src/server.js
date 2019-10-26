import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import ApolloServerFactory from "./apollo";
import { imageUpload } from "./restApi";

const app = express();
const ApolloServer = ApolloServerFactory();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "images")));
app.use(
  express.static(path.resolve(__dirname, "../../front/src/build"), {
    index: false,
  }),
);

app.use("/upload", imageUpload);

// apollo server add middleware
ApolloServer.applyMiddleware({ app, path: "/api" });

if (process.env.NODE_ENV.trim() === "production") {
  // eslint-disable-next-line global-require
  const ssr = require("dist/server-ssr").default;
  app.use(ssr);
}

// apollo server start
app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀Server ready at http://localhost:${process.env.PORT}`);
});
