import { useId, forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';
import { CONFIG } from '../../global-config.js';

export const Logo = forwardRef((props, ref) => {
  const {
    className,
    href = '/',
    isSingle = true,
    disabled,
    sx,
    ...other
  } = props;

  const theme = useTheme();
  const gradientId = useId();

  const singleLogo = (
    <img
      alt="Single logo"
      src={`${CONFIG.assetsDir}/logo/zimtrade.svg`}
      width="100%"
      height="100%"
    />
  );

  const fullLogo = (
    <img
      alt="Full logo"
      src={`${CONFIG.assetsDir}/logo/zimtrade.svg`}
      width="100%"
      height="100%"
    />
  );

  return (
    <LogoRoot
      ref={ref}
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: isSingle ? 64 : 160, // increased size
          height: isSingle ? 64 : 50, // increased size
          pointerEvents: disabled ? 'none' : 'auto',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
});

export default Logo;

const LogoRoot = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
}));
