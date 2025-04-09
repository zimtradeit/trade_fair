import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function MailItem({ mail, selected, sx, ...other }) {
  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        disableGutters
        sx={[
          {
            p: 1,
            gap: 2,
            borderRadius: 1,
            ...(selected && { bgcolor: 'action.selected' }),
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Avatar alt={mail.from.name} src={mail.from.avatarUrl ?? ''}>
          {mail.from.name.charAt(0).toUpperCase()}
        </Avatar>

        <ListItemText
          primary={mail.from.name}
          secondary={mail.message}
          slotProps={{
            primary: { noWrap: true },
            secondary: {
              noWrap: true,
              sx: {
                ...(mail.isUnread && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              },
            },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignSelf: 'stretch',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Typography
            noWrap
            variant="body2"
            component="span"
            sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
          >
            {fToNow(mail.createdAt)}
          </Typography>

          {!!mail.isUnread && (
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'info.main',
              }}
            />
          )}
        </Box>
      </ListItemButton>
    </Box>
  );
}
