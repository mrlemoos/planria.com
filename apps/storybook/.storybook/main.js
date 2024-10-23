import { dirname, join, resolve } from "node:path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/**
 * @type {import('@storybook/react-vite').StorybookConfig}
 */
const config = {
  stories: [
    // design system stories
    "../../../packages/design/src/*.stories.@(ts|tsx)",
    // general documentation
    "../docs/*.mdx",
    "../docs/**/*.mdx",
    // organisms
    "../../../apps/web/src/**/*.stories.@(ts|tsx)",
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-themes"),
    {
      name: getAbsolutePath("@storybook/addon-postcss"),
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    "@chromatic-com/storybook",
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {},

  async viteFinal(config, { configType }) {
    return {
      ...config,
      define: {
        "process.env": {},
      },
      resolve: {
        alias: [
          {
            find: "@planria/design/",
            replacement: resolve(__dirname, "../../../packages/design/"),
          },
        ],
      },
    };
  },

  docs: {
    defaultName: "Overview",
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
