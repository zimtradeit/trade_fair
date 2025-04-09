import { orderBy, kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const createNavItem = ({ category, name, iconPrefix, packageType }) => ({
  name,
  href: `/components/${category}/${kebabCase(name)}`,
  icon: `${CONFIG.assetsDir}/assets/icons/components/${iconPrefix}-${kebabCase(name)}.svg`,
  packageType,
});

// ----------------------------------------------------------------------

const foundationNav = ['Colors', 'Typography', 'Shadows', 'Grid', 'Icons'].map((name) =>
  createNavItem({
    category: 'foundation',
    name,
    iconPrefix: 'ic',
    packageType: 'Foundation',
  })
);

// ----------------------------------------------------------------------

const MUI_X_COMPONENTS = ['Data grid', 'Date pickers', 'Tree view'];

const muiNav = [
  'Chip',
  'List',
  'Menu',
  'Tabs',
  'Alert',
  'Badge',
  'Table',
  'Avatar',
  'Dialog',
  'Rating',
  'Slider',
  'Switch',
  'Drawer',
  'Buttons',
  'Date pickers',
  'Popover',
  'Stepper',
  'Tooltip',
  'Checkbox',
  'Progress',
  'Timeline',
  'Accordion',
  'Textfield',
  'Data grid',
  'Tree view',
  'Pagination',
  'Breadcrumbs',
  'Autocomplete',
  'Radio button',
  'Transfer list',
].map((name) =>
  createNavItem({
    category: 'mui',
    name,
    iconPrefix: 'ic',
    packageType: MUI_X_COMPONENTS.includes(name) ? 'MUI X' : 'MUI',
  })
);

// ----------------------------------------------------------------------

const THIRD_PARTY_COMPONENTS = [
  'Map',
  'Chart',
  'Image',
  'Editor',
  'Upload',
  'Scroll',
  'Animate',
  'Carousel',
  'Lightbox',
  'Snackbar',
  'Markdown',
  'Walktour',
  'Form wizard',
  'Multi language',
  'Form validation',
  'Scroll progress',
  'Organization chart',
];

const extraNav = [
  'Map',
  'Dnd',
  'Chart',
  'Image',
  'Label',
  'Editor',
  'Upload',
  'Scroll',
  'Layout',
  'Animate',
  'Carousel',
  'Lightbox',
  'Snackbar',
  'Markdown',
  'Walktour',
  'Mega menu',
  'Utilities',
  'Multi language',
  'Navigation bar',
  'Form validation',
  'Form wizard',
  'Scroll progress',
  'Organization chart',
].map((name) =>
  createNavItem({
    category: 'extra',
    name,
    iconPrefix: 'ic-extra',
    packageType: THIRD_PARTY_COMPONENTS.includes(name) ? '3rd Party' : 'Custom',
  })
);

export const allComponents = [
  { title: 'Foundation', items: foundationNav },
  { title: 'MUI', items: orderBy(muiNav, ['name'], ['asc']) },
  { title: 'Extra', items: orderBy(extraNav, ['name'], ['asc']) },
];
