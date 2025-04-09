import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fData } from 'src/utils/format-number';

import { Iconify } from '../../iconify';
import { uploadClasses } from '../classes';
import { fileData, FileThumbnail } from '../../file-thumbnail';

// ----------------------------------------------------------------------

export function MultiFilePreview({
  sx,
  onRemove,
  lastNode,
  thumbnail,
  slotProps,
  firstNode,
  files = [],
  className,
  ...other
}) {
  return (
    <ListRoot
      thumbnail={thumbnail}
      className={mergeClasses([uploadClasses.uploadMultiPreview, className])}
      sx={sx}
      {...other}
    >
      {firstNode && <ItemNode thumbnail={thumbnail}>{firstNode}</ItemNode>}

      {files.map((file) => {
        const { name, size } = fileData(file);

        if (thumbnail) {
          return (
            <ItemThumbnail key={name}>
              <FileThumbnail
                tooltip
                imageView
                file={file}
                onRemove={() => onRemove?.(file)}
                sx={[
                  (theme) => ({
                    width: 80,
                    height: 80,
                    border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                  }),
                ]}
                slotProps={{ icon: { sx: { width: 36, height: 36 } } }}
                {...slotProps?.thumbnail}
              />
            </ItemThumbnail>
          );
        }

        return (
          <ItemRow key={name}>
            <FileThumbnail file={file} {...slotProps?.thumbnail} />

            <ListItemText
              primary={name}
              secondary={fData(size)}
              slotProps={{
                secondary: { sx: { typography: 'caption' } },
              }}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Iconify width={16} icon="mingcute:close-line" />
              </IconButton>
            )}
          </ItemRow>
        );
      })}

      {lastNode && <ItemNode thumbnail={thumbnail}>{lastNode}</ItemNode>}
    </ListRoot>
  );
}

// ----------------------------------------------------------------------

const ListRoot = styled('ul', {
  shouldForwardProp: (prop) => !['thumbnail', 'sx'].includes(prop),
})(({ thumbnail, theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  ...(thumbnail && { flexWrap: 'wrap', flexDirection: 'row' }),
}));

const ItemThumbnail = styled('li')(() => ({ display: 'inline-flex' }));

const ItemRow = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 1, 1, 1.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
}));

const ItemNode = styled('li', {
  shouldForwardProp: (prop) => !['thumbnail', 'sx'].includes(prop),
})(({ thumbnail }) => ({
  ...(thumbnail && { width: 'auto', display: 'inline-flex' }),
}));
