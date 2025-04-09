import { useState, useCallback } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { isEqualPath } from 'minimal-shared/utils';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link, { linkClasses } from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { RouterLink } from 'src/routes/components';
import { useRouter, usePathname } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export function NavSearch({ navData = [], sx }) {
  const router = useRouter();
  const pathname = usePathname();

  const options = navData?.map((section) => section.items).flat();
  const activeOption = options?.find((opt) => isEqualPath(opt.href, pathname));

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(activeOption || null);

  const handleChange = useCallback(
    (item) => {
      setSelectedItem(item);
      if (item) {
        router.push(item?.href);
      }
    },
    [router]
  );

  const paperStyles = {
    width: 240,
    [` .${autocompleteClasses.listbox}`]: {
      [` .${autocompleteClasses.option}`]: {
        p: 0,
        [` .${linkClasses.root}`]: {
          px: 1,
          py: 0.5,
          width: 1,
        },
      },
    },
  };

  const textFieldStyles = {
    [`& .${inputBaseClasses.input}`]: {
      typography: 'body2',
      fontWeight: 'fontWeightMedium',
    },
  };

  return (
    <Autocomplete
      sx={sx}
      autoHighlight
      disableClearable
      popupIcon={null}
      options={options}
      value={selectedItem}
      onChange={(event, newValue) => handleChange(newValue)}
      onInputChange={(event, newValue) => setSearchQuery(newValue)}
      getOptionLabel={(option) => option.name}
      noOptionsText={<SearchNotFound query={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      slotProps={{ paper: { sx: paperStyles } }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          size="small"
          variant="filled"
          placeholder="Search..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={textFieldStyles}
        />
      )}
      renderOption={(props, item, { inputValue }) => {
        const matches = match(item.name, inputValue);
        const parts = parse(item.name, matches);

        return (
          <li {...props} key={item.name}>
            <Link
              key={item.name}
              component={RouterLink}
              href={item.href}
              color="inherit"
              underline="none"
            >
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
