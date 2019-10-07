"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", err => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const paths = require("../config/paths");
const fs = require("fs-extra");
const webpack = require("webpack");
const webpackConfig = require("../config/webpack.config.server");

function build() {
  const compiler = webpack(webpackConfig);

  console.log(`clearing ${paths.ssrBuild}...`);
  // fs.removeSync(paths.appBuild);
  fs.emptyDirSync(paths.ssrBuild);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      } else {
        console.log(stats.toString());
      }
    });
  });
}

build();
