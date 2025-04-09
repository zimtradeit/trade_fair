import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function Toolbar({ sx, isText, isMulti, onRefresh, onChangeText, onChangeMulti, ...other }) {
  return (
    <Box
      sx={[
        () => ({
          display: 'flex',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <FormControlLabel
        label="Text object"
        control={
          <Switch checked={isText} onChange={onChangeText} inputProps={{ id: 'text-switch' }} />
        }
      />

      <Box sx={{ flexGrow: 1 }} />
      {!isText && (
        <FormControlLabel
          label="MultiItem"
          control={
            <Switch
              checked={isMulti}
              onChange={onChangeMulti}
              inputProps={{ id: 'multi-item-switch' }}
            />
          }
        />
      )}
      <IconButton onClick={onRefresh}>
        <Iconify icon="eva:refresh-fill" />
      </IconButton>
    </Box>
  );
}
