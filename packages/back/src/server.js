import express from "express";
import bodyParser from "body-parser";
import ssr from "dist/server-ssr";
import path from "path";
// import cors from "cors";
import AplloServer from "./apollo";
import { imageUpload } from "./restApi";

const app = express();

// express middleware
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "images")));
app.use(
  express.static(path.resolve(__dirname, "../../front/src/build"), {
    index: false,
  }),
);

// router(rest api)
app.use("/upload", imageUpload);

// apollo server add middleware
AplloServer.applyMiddleware({ app, path: "/api" });

app.use(ssr);
// apollo server start
app.listen({ port: process.env.PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${AplloServer.graphqlPath}`,
  );
});
