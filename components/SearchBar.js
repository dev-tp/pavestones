import { autocompleteClasses, styled } from '@mui/material';
import { VariableSizeList } from 'react-window';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import React from 'react';
import TextField from '@mui/material/TextField';

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
  return (
    <Autocomplete
      getOptionLabel={(option) => option.dedicated_to}
      ListboxComponent={ListboxComponent}
      options={props.options}
      PopperComponent={PopperComponent}
      renderInput={(params) => (
        <TextField {...params} fullWidth label="Search" />
      )}
      renderOption={(props, option) => [props, option]}
      style={{ position: 'absolute', width: 400 }}
    />
  );
}
