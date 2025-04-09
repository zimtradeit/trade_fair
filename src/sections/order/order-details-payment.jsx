import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OrderDetailsPayment({ payment }) {
  return (
    <>
      <CardHeader
        title="Payment"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Box
        sx={{
          p: 3,
          gap: 0.5,
          display: 'flex',
          typography: 'body2',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {payment?.cardNumber}
        <Iconify icon="logos:mastercard" width={24} />
      </Box>
    </>
  );
}
