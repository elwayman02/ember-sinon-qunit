'use strict';

const { resolve } = require;

module.exports = {
  plugins: [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        // The stage 1 implementation
        version: 'legacy',
      },
    ],
    // Properties plugin is required by ember-cli-babel
    // because ember-cli-babel is buggy
    resolve('@babel/plugin-proposal-class-properties'),
  ],
};
