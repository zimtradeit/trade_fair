import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';

import { navBasicClasses } from '../styles';

// ----------------------------------------------------------------------

export const NavCollapse = styled(Collapse, {
  shouldForwardProp: (prop) => !['depth', 'sx'].includes(prop),
})(({ depth, theme }) => {
  const verticalLineStyles = {
    top: 0,
    left: 0,
    bottom: 0,
    width: '1px',
    content: '""',
    opacity: 0.24,
    position: 'absolute',
    backgroundColor: theme.vars.palette.grey[500],
  };

  return {
    ...(depth && {
      ...(depth + 1 !== 1 && {
        paddingLeft: 'calc(var(--nav-item-pl) + var(--nav-icon-size) / 2)',
        [`& .${navBasicClasses.ul}`]: {
          paddingLeft: '12px',
          position: 'relative',
          '&::before': verticalLineStyles,
        },
      }),
    }),
  };
});
