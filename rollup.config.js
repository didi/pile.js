import batchPackages from '@lerna/batch-packages';
import filterPackages from '@lerna/filter-packages';
import { getPackages } from '@lerna/project';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import minimist from 'minimist';
import alias from 'rollup-plugin-alias';

/**
 * Get a list of the non-private sorted packages with Lerna v3
 * @see https://github.com/lerna/lerna/issues/1848
 * @return {Promise<Package[]>} List of packages
 */
async function getSortedPackages() {
  // Support --scope and --ignore globs
  const { scope, ignore } = minimist(process.argv.slice(2));

  // Standard Lerna plumbing getting packages
  const packages = await getPackages(__dirname);
  const filtered = filterPackages(
    packages,
    scope,
    ignore,
    false,
  );

  return batchPackages(filtered)
    .reduce((arr, batch) => arr.concat(batch), []);
}

async function main() {
  const plugins = [
    alias({
      resolve: ['.js', '.jsx'],
    }),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**', // only transpile our source code
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
      plugins: [["lodash", { "id": ["recompose"] }]]
    }),
    commonjs({
      namedExports: {
        classnames: ['classNames'],
      },
    }),
    filesize(),
  ];

  if (process.env.NODE_ENV === 'production') {
    // 添加压缩处理
  }

  const sourcemap = true;
  const packages = await getSortedPackages();
  const results = [];

  packages.filter(pkg => pkg.name !== '@pile-ui/theme-default').forEach((pkg) => {
    // Get settings from package JSON
    const {
      name, main, module, version, author,
    } = pkg.toJSON();
    const basePath = path.relative(__dirname, pkg.location);
    const input = path.join(basePath, 'src/index.js');

    // banner
    const banner = `${'/*!\n'
    + ' * '}${name}.js v${version}\n`
    + ` * (c) 2018-${new Date().getFullYear()} ${author}\n`
    + ' * Released under the MIT License.\n'
    + ' */';

    // Generate the externals to use, by default don't include dependencies
    const baseExternal = ['react', 'react-dom'];
    const external = [].concat(baseExternal, Object.keys(pkg.dependencies || []));

    // cjs format output
    const mainOutput = {
      name,
      file: path.join(basePath, main),
      format: 'cjs',
      sourcemap,
      banner,
    };

    // ES format output
    const moduleOutput = {
      name,
      file: path.join(basePath, module),
      format: 'esm',
      sourcemap,
      banner,
    };

    results.push({
      input,
      output: [
        mainOutput,
        moduleOutput,
      ],
      external,
      plugins,
    });

    // bundle for browser
    // 先关闭打包成umd，classnames模块打包有点问题
    // issuse: https://github.com/rollup/rollup-plugin-commonjs/issues/256
    //
    // const rename = name.substr(6);
    // results.push({
    //   input,
    //   external: baseExternal,
    //   output: {
    //     name,
    //     banner,
    //     globals: {},
    //     file: path.join(basePath, `/lib/${rename}.iife.js`),
    //     format: 'umd',
    //     sourcemap,
    //   },
    //   // treeshake: false,
    //   plugins,
    // });
  });

  return results;
}

export default main();
