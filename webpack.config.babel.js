var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

/** Constants */
var
  SRC                     = 'src',
  DEV                     = 'dev',
  DIST                    = 'dist',
  TEST                    = 'test',
  GH_PAGES                = 'gh-pages',
  CONFIG                  = 'config',
  NODE_MODULES            = 'node_modules',

  DEV_TEMPLATE            = 'template.html',
  GH_PAGES_TEMPLATE       = 'template.html',

  DIST_MAIN               = 'index.es6',
  DEV_MAIN                = 'main.jsx',
  GH_PAGES_MAIN           = 'main.jsx',
  TEST_MAIN               = 'index.es6',

  DEV_CONFIG              = 'dev.es6',
  DIST_CONFIG             = 'dist.es6',
  GH_PAGES_CONFIG         = 'gh-pages.es6',
  TEST_CONFIG             = 'test.es6',

  ROOT_PATH               = path.resolve(__dirname),
  SRC_PATH                = path.resolve(ROOT_PATH, SRC),
  DEV_PATH                = path.resolve(ROOT_PATH, DEV),
  DIST_PATH               = path.resolve(ROOT_PATH, DIST),
  TEST_PATH               = path.resolve(ROOT_PATH, TEST),
  GH_PAGES_PATH           = path.resolve(ROOT_PATH, GH_PAGES),
  CONFIG_PATH             = path.resolve(ROOT_PATH, CONFIG),
  NODE_MODULES_PATH       = path.resolve(ROOT_PATH, NODE_MODULES),

  DEV_CONFIG_PATH         = path.resolve(CONFIG_PATH, DEV_CONFIG),
  DIST_CONFIG_PATH        = path.resolve(CONFIG_PATH, DIST_CONFIG),
  GH_PAGES_CONFIG_PATH    = DEV_CONFIG_PATH,
  TEST_CONFIG_PATH        = path.resolve(CONFIG_PATH, TEST_CONFIG),

  DIST_ENTRY_PATH         = path.resolve(SRC_PATH, DIST_MAIN),
  DEV_ENTRY_PATH          = path.resolve(DEV_PATH, DEV_MAIN),
  GH_PAGES_ENTRY_PATH     = DEV_ENTRY_PATH,
  TEST_ENTRY_PATH         = path.resolve(TEST_PATH, TEST_MAIN),

  DEV_TEMPLATE_PATH       = path.resolve(DEV_PATH, DEV_TEMPLATE),
  GH_PAGES_TEMPLATE_PATH  = DEV_TEMPLATE_PATH,

  HOST                    = process.env.WEBPACK_NHZ_SINK_HOST || 'localhost',
  PORT                    = process.env.WEBPACK_NHZ_SINK_PORT || 9000,

  TARGET                  = process.env.npm_lifecycle_event;

/** Common config */
var config = {
  resolve: {
    extensions: [ "", ".js", ".es6", ".jsx" ],
    alias: {
      src: SRC_PATH,
      config: CONFIG_PATH,
      test: TEST_PATH,
      dev: DEV_PATH
    }
  },

  output: {
    filename: pkg.name + '.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|es6|jsx)$/,
        loader: 'eslint-loader',
        include: [ SRC_PATH, DEV_PATH, CONFIG_PATH, TEST_PATH ],
        exclude: NODE_MODULES_PATH
      },
    ],
    loaders: [
      {
        test: /\.(js|es6|jsx)$/,
        loaders: ['babel'],
        include: [ SRC_PATH, DEV_PATH, CONFIG_PATH, TEST_PATH ]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [ 'style', 'css', 'sass' ],
        include: [ SRC_PATH, DEV_PATH, CONFIG_PATH, TEST_PATH, NODE_MODULES_PATH ]
      },
      {
        test: /\.((?!(js|es6|jsx|scss|sass)).)+$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ],
        include: [ SRC_PATH, DEV_PATH, CONFIG_PATH, TEST_PATH, NODE_MODULES_PATH ]
      }
    ]
  },

  eslint: {
    configFile: '.eslintrc'
  }
}

/** Targets */
if(TARGET === DEV) {
  config.entry = DEV_ENTRY_PATH;
  config.devtool = 'eval-source-map';
  config.module.loaders[0].loaders = ['react-hot', 'babel'];
  config.resolve.alias.config = DEV_CONFIG_PATH;
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: pkg.description + ' ' + pkg.version,
      script: pkg.name + '.js',
      template: DEV_TEMPLATE_PATH
    })
  ];

  config.devServer = {
    colors:true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: HOST,
    port: PORT
  };
}

if(TARGET === GH_PAGES) {
  config.entry = GH_PAGES_ENTRY_PATH;
  config.resolve.alias.config = GH_PAGES_CONFIG_PATH;
  config.module.loaders[0].include.push(NODE_MODULES_PATH);
  config.output.path = GH_PAGES_PATH;
  config.plugins = [
    new webpack.optimize.DedupePlugin(),

    new HtmlwebpackPlugin({
      title: pkg.description + ' ' + pkg.version,
      script: pkg.name + ".js",
      template: GH_PAGES_TEMPLATE_PATH
    }),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: {
          except: ['$super', '$', 'exports', 'require']
      }
    })
  ];
}

if(TARGET === DIST) {
  config.entry = DIST_ENTRY_PATH
}

if(TARGET === TEST) {
  config.entry = TEST_ENTRY_PATH
}

console.log(JSON.stringify(config,null,2));

module.exports = config;
