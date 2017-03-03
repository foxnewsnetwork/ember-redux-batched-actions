/* jshint node: true */
'use strict';
const Webpack = require('broccoli-webpack');

module.exports = {
  name: 'ember-redux-batched-actions',
  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    const vendor = this.treePaths.vendor;

    app.import(vendor + '/redux-batched-actions/dist/main.js', {
      using: [{ transformation: 'amd', as: 'redux-batched-actions' }]
    });

    return app;
  },
  options: {
    nodeAssets: {
      'redux-batched-actions': {
        vendor: {
          include: ['index.js'],
          processTree(inputTree) {
            return new Webpack([inputTree], {
              entry: 'redux-batched-actions/lib/index.js',
              output: {
                filename: 'redux-batched-actions/dist/main.js',
                library: 'redux-batched-actions',
                libraryTarget: 'umd'
              }
            });
          }
        }
      }
    }
  }
};
