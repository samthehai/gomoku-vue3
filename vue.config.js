module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // eslint-disable-next-line no-param-reassign
      args[0].title = 'Gomoku Game';
      return args;
    });

    config.output.globalObject('this');
  },
  // ...other vue-cli plugin options...
  pwa: {
    name: "Len's Game",
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    },
  },
};
