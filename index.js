'use strict';

module.exports = {
  name: require('./package').name,

  treeForAddonTestSupport(tree) {
    // intentionally not calling _super here
    // so that can have our `import`'s be
    // import { ... } from 'ember-sinon-qunit';

    return this.preprocessJs(tree, '/', this.name, {
      registry: this.registry,
    });
  },
};
