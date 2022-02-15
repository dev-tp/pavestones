import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';
import Search from '@mui/icons-material/Search';

export default function SearchBar(props) {
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (value === '') {
      return;
    }

    fetch(`/api?search=${value}`)
      .then((response) => response.json())
      .then((json) => setOptions(json));
  }, [setOptions, value]);

  return (
    <Autocomplete
      getOptionLabel={(option) => option.dedicated_to}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      noOptionsText="No entries"
      onChange={(_, value) => props.onSelect(value)}
      options={options}
      renderInput={(params) => (
        <Paper ref={params.InputProps.ref} style={props.style}>
          <InputBase
            inputProps={{ ...params.inputProps }}
            onChange={(event) => setValue(event.target.value)}
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
