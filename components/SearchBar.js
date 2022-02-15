import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';
import Search from '@mui/icons-material/Search';

const customFilterOptions = createFilterOptions({
  ignoreAccents: true,
  ignoreCase: true,
  limit: 10,
  trim: true,
});

export default function SearchBar(props) {
  return (
    <Autocomplete
      filterOptions={customFilterOptions}
      getOptionLabel={(option) => option.dedicated_to}
      noOptionsText="No entries"
      onChange={(_, value) => props.onSelect(value)}
      options={props.options}
      renderInput={(params) => (
        <Paper ref={params.InputProps.ref} style={props.style}>
          <InputBase
            inputProps={{ ...params.inputProps }}
            placeholder="Search..."
            style={{ flexGrow: 1 }}
          />
          <IconButton size="small">
            <Search />
          </IconButton>
        </Paper>
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option._id}
          style={{ alignItems: 'start', display: 'flex', flexFlow: 'column' }}
        >
          <div>{option.dedicated_to}</div>
          <div>
            x: {option.x}, y: {option.y}
          </div>
        </li>
      )}
    />
  );
}
