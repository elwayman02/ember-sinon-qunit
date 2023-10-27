import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['test-support/index.js', 'index.js']),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    babel({
      extensions: ['.js', '.ts'],
      babelHelpers: 'bundled',
    }),

    // Needed to support imports without extensions
    // For example `import { createSandbox, restoreSandbox } from './test-support';`
    // Without node-resolve plugin, we would need to write the code as
    // `import { createSandbox, restoreSandbox } from './test-support/index.ts'
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets([]),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
