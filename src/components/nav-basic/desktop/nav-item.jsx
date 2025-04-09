import { forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from '../../iconify';
import { createNavItem } from '../utils';
import { navItemStyles, navBasicClasses } from '../styles';

// ----------------------------------------------------------------------

export const NavItem = forwardRef((props, ref) => {
  const {
    path,
    icon,
    info,
    title,
    caption,
    /********/
    open,
    active,
    disabled,
    /********/
    depth,
    render,
    hasChild,
    slotProps,
    className,
    externalLink,
    enabledRootRedirect,
    ...other
  } = props;

  const navItem = createNavItem({
    path,
    icon,
    info,
    depth,
    render,
    hasChild,
    externalLink,
    enabledRootRedirect,
  });

  const ownerState = {
    open,
    active,
    disabled,
    variant: navItem.rootItem ? 'rootItem' : 'subItem',
  };

  return (
    <ItemRoot
      ref={ref}
      aria-label={title}
      {...ownerState}
      {...navItem.baseProps}
      disableRipple={navItem.rootItem}
      className={mergeClasses([navBasicClasses.item.root, className], {
        [navBasicClasses.state.open]: open,
        [navBasicClasses.state.active]: active,
        [navBasicClasses.state.disabled]: disabled,
      })}
      sx={slotProps?.sx}
      {...other}
    >
      {icon && (
        <ItemIcon {...ownerState} className={navBasicClasses.item.icon} sx={slotProps?.icon}>
          {navItem.renderIcon}
        </ItemIcon>
      )}

      {title && (
        <ItemTexts {...ownerState} className={navBasicClasses.item.texts} sx={slotProps?.texts}>
          <ItemTitle {...ownerState} className={navBasicClasses.item.title} sx={slotProps?.title}>
            {title}
          </ItemTitle>

          {caption && navItem.subItem && (
            <ItemCaptionText
              {...ownerState}
              className={navBasicClasses.item.caption}
              sx={slotProps?.caption}
            >
              {caption}
            </ItemCaptionText>
          )}
        </ItemTexts>
      )}

      {info && (
        <ItemInfo {...ownerState} className={navBasicClasses.item.info} sx={slotProps?.info}>
          {navItem.renderInfo}
        </ItemInfo>
      )}

      {hasChild && (
        <ItemArrow
          {...ownerState}
          icon={navItem.subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'}
          className={navBasicClasses.item.arrow}
          sx={slotProps?.arrow}
        />
      )}
    </ItemRoot>
  );
});

// ----------------------------------------------------------------------

const shouldForwardProp = (prop) => !['open', 'active', 'disabled', 'variant', 'sx'].includes(prop);

/**
 * @slot root
 */
const ItemRoot = styled(ButtonBase, { shouldForwardProp })(({ active, open, theme }) => {
  const rootItemStyles = {
    padding: 'var(--nav-item-root-padding)',
    borderRadius: 'var(--nav-item-radius)',
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': { opacity: 0.64 },
    ...(open && { opacity: 0.64 }),
    ...(active && { color: 'var(--nav-item-root-active-color)' }),
  };

  const subItemStyles = {
    width: '100%',
    color: 'var(--nav-item-sub-color)',
    padding: 'var(--nav-item-sub-padding)',
    borderRadius: 'var(--nav-item-sub-radius)',
    '&:hover': {
      color: 'var(--nav-item-sub-hover-color)',
      backgroundColor: 'var(--nav-item-sub-hover-bg)',
    },
    ...(open && {
      color: 'var(--nav-item-sub-open-color)',
      backgroundColor: 'var(--nav-item-sub-open-bg)',
    }),
    ...(active && {
      color: 'var(--nav-item-sub-active-color)',
      backgroundColor: 'var(--nav-item-sub-active-bg)',
    }),
  };

  return {
    variants: [
      { props: { variant: 'rootItem' }, style: rootItemStyles },
      { props: { variant: 'subItem' }, style: subItemStyles },
      { props: { disabled: true }, style: navItemStyles.disabled },
    ],
  };
});

/**
 * @slot icon
 */
const ItemIcon = styled('span', { shouldForwardProp })(() => ({
  ...navItemStyles.icon,
  width: 'var(--nav-icon-size)',
  height: 'var(--nav-icon-size)',
  margin: 'var(--nav-icon-margin)',
}));

/**
 * @slot texts
 */
const ItemTexts = styled('span', { shouldForwardProp })(() => ({
  ...navItemStyles.texts,
}));

/**
 * @slot title
 */
const ItemTitle = styled('span', { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.title(theme),
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  variants: [
    { props: { active: true }, style: { fontWeight: theme.typography.fontWeightSemiBold } },
  ],
}));

/**
 * @slot caption text
 */
const ItemCaptionText = styled('span', { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.captionText(theme),
  color: 'var(--nav-item-caption-color)',
}));

/**
 * @slot info
 */
const ItemInfo = styled('span', { shouldForwardProp })(() => ({
  ...navItemStyles.info,
}));

/**
 * @slot arrow
 */
const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.arrow(theme),
  variants: [{ props: { variant: 'subItem' }, style: { marginRight: theme.spacing(-0.5) } }],
}));
