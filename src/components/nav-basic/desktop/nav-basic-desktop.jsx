import { useTheme } from '@mui/material/styles';

import { NavList } from './nav-list';
import { Nav, NavUl } from '../components';
import { navBasicVars, navBasicClasses } from '../styles';

// ----------------------------------------------------------------------

export function NavBasicDesktop({
  sx,
  data,
  render,
  slotProps,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}) {
  const theme = useTheme();

  const cssVars = { ...navBasicVars.desktop(theme), ...overridesVars };

  return (
    <Nav
      className={navBasicClasses.desktop}
      sx={[{ ...cssVars }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <NavUl sx={{ flexDirection: 'row', gap: 'var(--nav-item-gap)' }}>
        {data.map((list) => (
          <NavList
            key={list.title}
            depth={1}
            data={list}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Nav>
  );
}
