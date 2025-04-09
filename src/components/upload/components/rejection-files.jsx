import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { fData } from 'src/utils/format-number';

import { uploadClasses } from '../classes';
import { fileData } from '../../file-thumbnail';

// ----------------------------------------------------------------------

export function RejectionFiles({ files, sx, className, ...other }) {
  return (
    <ListRoot
      className={mergeClasses([uploadClasses.uploadRejectionFiles, className])}
      sx={sx}
      {...other}
    >
      {files?.map(({ file, errors }) => {
        const { path, size } = fileData(file);

        return (
          <ListItem key={path}>
            <ItemTitle>
              {path} - {size ? fData(size) : ''}
            </ItemTitle>

            {errors.map((error) => (
              <ItemCaption key={error.code}>- {error.message}</ItemCaption>
            ))}
          </ListItem>
        );
      })}
    </ListRoot>
  );
}

// ----------------------------------------------------------------------

const ListRoot = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.vars.palette.error.main}`,
  backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
}));

const ListItem = styled('li')(() => ({ display: 'flex', flexDirection: 'column' }));

const ItemTitle = styled('span')(({ theme }) => ({ ...theme.typography.subtitle2 }));

const ItemCaption = styled('span')(({ theme }) => ({ ...theme.typography.caption }));
