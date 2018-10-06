/* config-overrides.js */
// https://github.com/Igorbek/typescript-plugin-styled-components
const { injectBabelPlugin } = require("react-app-rewired");

const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const rewireSvgReactLoader = require("react-app-rewire-svg-react-loader");

module.exports = function override(config, env) {
  // Styled components
  config = injectBabelPlugin("babel-plugin-styled-components", config);
  config.module.rules[1].oneOf = config.module.rules[1].oneOf.map(rule => {
    if (!rule.test || rule.test.constructor.name !== "RegExp") return rule;

    if (rule.test.test("hello.ts")) {
      rule.use[0].options.getCustomTransformers = () => ({
        before: [styledComponentsTransformer]
      });
    }
    return rule;
  });

  // Svg
  config = rewireSvgReactLoader(config, env);

  // config.module.rules[1].oneOf.push({
  //   test: /\.svg$/,
  //   loader: "svg-sprite-loader"
  // });

  return config;
};
