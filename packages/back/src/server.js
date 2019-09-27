import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import AplloServer from "./apollo";
import { imageUpload } from "./restApi";

const app = express();

// express middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "images")));

// router(rest api)
app.use("/upload", imageUpload);

// apollo server add middleware
AplloServer.applyMiddleware({ app });

// apollo server start
app.listen({ port: process.env.PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${
      AplloServer.graphqlPath
    }`,
  );
});
