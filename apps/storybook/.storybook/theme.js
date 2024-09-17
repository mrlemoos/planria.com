import { create } from '@storybook/theming/create';

const primary = 'hsl(346.8, 77.2%, 49.8%)';
const secondary = 'hsl(240, 3.7%, 15.9%)';
const border = 'hsl(240, 5.9%, 90%)';

const background = 'hsl(0, 0%, 0%)';
const foreground = 'hsl(0, 0%, 95%)';

const theme = create({
  base: 'dark',
  // typography
  fontBase: '"Inter", sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  brandTitle: 'planria/design',
  brandUrl: 'https://design.planria.com',
  brandImage: 'https://www.planria.com/logos/planria@dark.png',
  brandTarget: '_self',

  // colours
  colorPrimary: primary,
  colorSecondary: secondary,

  // UI
  // appBg: background,
  // appContentBg: background,
  // appPreviewBg: 'hsl(0, 0%, 100%)',
  appBorderColor: border,
  appBorderRadius: 4,

  // text colours
  textColor: foreground,
  textInverseColor: background,

  // toolbar default and active colors
  barTextColor: foreground,
  barSelectedColor: border,
  barHoverColor: border,
  barBg: background,

  // form colours
  inputBg: background,
  inputBorder: border,
  inputTextColor: foreground,
  inputBorderRadius: 2,
});

export default theme;