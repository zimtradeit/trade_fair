import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

export function CarouselProgressBar({ sx, value, className, ...other }) {
  return (
    <ProgressBarRoot
      className={mergeClasses([carouselClasses.progress.root, className])}
      sx={[{ '--progress-value': value }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <ProgressBar className={carouselClasses.progress.bar} />
    </ProgressBarRoot>
  );
}

// ----------------------------------------------------------------------

const ProgressBarRoot = styled('div')(({ theme }) => ({
  height: 6,
  maxWidth: 120,
  width: '100%',
  borderRadius: 6,
  overflow: 'hidden',
  position: 'relative',
  color: theme.vars.palette.text.primary,
  backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.2),
}));

const ProgressBar = styled('span')(({ theme }) => ({
  top: 0,
  bottom: 0,
  width: '100%',
  left: '-100%',
  position: 'absolute',
  backgroundColor: 'currentColor',
  transform: `translate3d(calc(var(--progress-value) * ${theme.direction === 'rtl' ? -1 : 1}%), 0px, 0px)`,
}));
