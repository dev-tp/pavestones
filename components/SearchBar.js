import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';
import Search from '@mui/icons-material/Search';

export default function SearchBar(props) {
  const [options, setOptions] = React.useState([]);

  function onChange(event) {}

  return (
    <Autocomplete
      noOptionsText="No entries"
      options={options}
      renderInput={(params) => (
        <Paper ref={params.InputProps.ref} style={props.style}>
          <InputBase
            inputProps={{ ...params.inputProps }}
            onChange={onChange}
            placeholder="Search..."
            style={{ flexGrow: 1 }}
          />
          <IconButton size="small">
            <Search />
          </IconButton>
        </Paper>
      )}
    />
  );
}
