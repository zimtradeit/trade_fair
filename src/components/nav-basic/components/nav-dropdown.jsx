import { styled } from '@mui/material/styles';
import Popover, { popoverClasses } from '@mui/material/Popover';

// ----------------------------------------------------------------------

export const NavDropdownPaper = styled('div')(({ theme }) => ({
  ...theme.mixins.paperStyles(theme, { dropdown: true }),
  width: 'var(--nav-dropdown-width)',
}));

// ----------------------------------------------------------------------

export const NavDropdown = styled(Popover)(({ open, theme }) => ({
  pointerEvents: 'none',
  [`& .${popoverClasses.paper}`]: {
    boxShadow: 'none',
    overflow: 'unset',
    backdropFilter: 'none',
    background: 'transparent',
    padding: theme.spacing(0, 0.75),
    ...(open && { pointerEvents: 'auto' }),
  },
}));
