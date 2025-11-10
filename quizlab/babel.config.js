module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."], // 프로젝트 루트를 기준으로 경로 해석
          alias: {
            "@": "./",
            "@mocks": "./mocks",
            "@utils": "./utils",
            "@types": "./types",
            "@components": "./components",
            "@constants": "./constants",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
