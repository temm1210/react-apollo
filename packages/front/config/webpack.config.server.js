const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");
const path = require("path");
const webpack = require("webpack");
const getClientEnvironment = require("./env");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const publicUrl = paths.servedPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: paths.ssrIndex,
  mode: "production",
  output: {
    path: paths.ssrBuild,
    // libraryTarget: "commonjs2",
    libraryTarget: "commonjs",
    filename: "server-ssr.js",
    chunkFilename: "js/[name].chunk.js",
    // publicPath: paths.servedPath // 정적 파일이 제공 될 경로
  },
  target: "node", // node 환경에서 실행 될 것이라는 것을 명시
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            // include: [paths.appBack, paths.appSrc],
            exclude: /node_modules/,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides",
              ),
              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: "@svgr/webpack?-svgo![path]",
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            //  exportOnlyLocals: true => 실제 css 파일을 생성X
            loader: require.resolve("css-loader"),
            options: {
              exportOnlyLocals: true,
            },
          },
          // CSS Module 을 위한 처리
          {
            test: cssModuleRegex,
            loader: require.resolve("css-loader"),
            options: {
              modules: true,
              exportOnlyLocals: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          // url-loader 를 위한 설정
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              emitFile: false,
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false, // 파일을 따로 저장하지 x
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
    // modules: [paths.appNodeModules, "node_modules"],
  },
  externals: ["express", nodeExternals()],
  plugins: [new webpack.DefinePlugin(env.stringified)],
};
