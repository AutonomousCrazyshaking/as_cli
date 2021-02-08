"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require("path");

var utils = require("./utils");

var config = require("../config");

var vueLoaderConfig = require("./vue.loader.conf");

var VueLoaderPlugin = require("vue-loader/lib/plugin-webpack4");

var createLintingRule = function createLintingRule() {
  return {
    test: /\.(js|vue)$/,
    loader: "eslint-loader",
    enforce: "pre",
    include: [path.resolve("../src")],
    options: {
      formatter: require("eslint-friendly-formatter"),
      emitWarning: !config.dev.showEslintErrorsInOverlay
    }
  };
};

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: ["./src/app.js", "./index.html"]
  },
  // entry: ["./src/app.js", "core-js/modules/es.array.iterator"],
  output: {
    path: config.build.assetsRoot,
    filename: "[name].[hash:10].js" // publicPath:
    //   process.env.NODE_ENV === "production"
    //     ? config.build.assetsPublicPath
    //     : config.dev.assetsPublicPath,

  },
  module: {
    rules: [].concat(_toConsumableArray(config.dev.useEslint ? [createLintingRule()] : []), [{
      test: /\.(vue|vue.html)$/,
      loader: "vue-loader",
      options: vueLoaderConfig
    }, {
      oneOf: [{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          // esModule 默认为true, 需要手动设置成false， 否则图片路径会编译成  [object Module]
          esModule: false,
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:10].[ext]")
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:10].[ext]")
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:10].[ext]")
        }
      }, {
        test: /.html$/,
        loader: "html-loader"
      }]
    }])
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      // 别名,在require的时候，可以使用这些别名，来缩短路径的长度
      src: path.resolve(__dirname, "../src/"),
      assets: path.resolve(__dirname, "../src/assets/"),
      components: path.resolve(__dirname, "../src/components/"),
      router: path.resolve(__dirname, "../src/router/")
    },
    extensions: [".js", ".vue", ".json"]
  }
};