const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const root = path.resolve(__dirname, '..');
const config = getDefaultConfig(__dirname);

// Let Metro see the library source in ../src
config.watchFolders = [root];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(root, 'node_modules'),
];

// Always resolve these singletons from the example app to avoid duplicates.
const singletons = [
  'react',
  'react-dom',
  'react-native',
  'react-native-web',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-keyboard-controller',
  '@shayrn/react-native-scaler',
];
const defaultResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const match = singletons.find(
    (name) => moduleName === name || moduleName.startsWith(`${name}/`)
  );
  const ctx = match
    ? { ...context, originModulePath: path.join(__dirname, 'index.js') }
    : context;
  return (defaultResolve || context.resolveRequest)(ctx, moduleName, platform);
};

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
