import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '../../iconify';
import { uploadClasses } from '../classes';

// ----------------------------------------------------------------------

export function SingleFilePreview({ file, sx, className, ...other }) {
  const fileName = typeof file === 'string' ? file : file.name;

  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

  return (
    <PreviewRoot
      className={mergeClasses([uploadClasses.uploadSinglePreview, className])}
      sx={sx}
      {...other}
    >
      <img alt={fileName} src={previewUrl} />
    </PreviewRoot>
  );
}

// ----------------------------------------------------------------------

const PreviewRoot = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  padding: theme.spacing(1),
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
}));

// ----------------------------------------------------------------------

export function DeleteButton({ sx, ...other }) {
  return (
    <IconButton
      size="small"
      sx={[
        (theme) => ({
          top: 16,
          right: 16,
          zIndex: 9,
          position: 'absolute',
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
          bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.72),
          '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48) },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );
}
