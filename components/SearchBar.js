import { autocompleteClasses, styled } from '@mui/material';
import { VariableSizeList } from 'react-window';
import Autocomplete from '@mui/material/Autocomplete';
import Clear from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React from 'react';
import Search from '@mui/icons-material/Search';

const PADDING = 8;

const ListboxComponent = React.forwardRef(function Component(props, ref) {
  const { children, ...other } = props;
  const itemData = [];

  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const itemCount = itemData.length;
  const itemSize = 48;

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }

    return itemData.map(() => itemSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          height={getHeight() + 2 * PADDING}
          innerElementType="ul"
          itemCount={itemCount}
          itemData={itemData}
          itemSize={() => itemSize}
          outerElementType={OuterElementType}
          overscanCount={5}
          ref={gridRef}
          width="100%"
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const PopperComponent = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef(function Component(props, ref) {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow(props) {
  const { data, index, style } = props;
  const dataset = data[index];

  return (
    <li {...dataset[0]} style={{ ...style, top: style.top + PADDING }}>
      {dataset[1].dedicated_to}
    </li>
  );
}

function useResetCache(data) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);

  return ref;
}

export default function SearchBar(props) {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(null);

  function clear() {
    props.onChange(null);
    setInputValue('');
    setSelectedValue(null);
  }

  function handleChange(_, value) {
    setSelectedValue(value);
    props.onChange(value);
  }

  return (
    <Autocomplete
      getOptionLabel={(option) => option.dedicated_to}
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      ListboxComponent={ListboxComponent}
      onChange={handleChange}
      onInputChange={(_, value) => setInputValue(value)}
      options={props.options}
      PopperComponent={PopperComponent}
      renderInput={(params) => (
        <Paper
          ref={params.InputProps.ref}
          style={{ display: 'flex', padding: '0.5rem 0.5rem 0.5rem 1rem' }}
        >
          <InputBase
            inputProps={params.inputProps}
            placeholder="Search"
            style={{ flexGrow: 1 }}
          />
          {selectedValue && (
            <IconButton onClick={clear} size="small">
              <Clear />
            </IconButton>
          )}
          <IconButton size="small">
            <Search />
          </IconButton>
        </Paper>
      )}
      renderOption={(props, option) => [props, option]}
      style={{ position: 'absolute', width: 400, zIndex: 1 }}
      value={selectedValue}
    />
  );
}
