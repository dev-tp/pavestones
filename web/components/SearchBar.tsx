import { autocompleteClasses, styled } from '@mui/material';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Clear from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React from 'react';
import Search from '@mui/icons-material/Search';

import PaveStoneProps from '../types/PaveStoneProps';

const PADDING = 8;

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: PaveStoneProps) =>
    `${option.dedicated_to} ${option.patron}`,
});

const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function Component(props, ref) {
  // `children` is not defined in `ReactNode` anymore, use `PropsWithChildren`
  // to inherit `children` in React >= 18
  type ReactNodeWithChildren = React.PropsWithChildren<React.ReactNode>;

  const { children, ...other } = props;
  const itemData: ReactNodeWithChildren[] = [];

  (children as ReactNodeWithChildren[]).forEach((item) => {
    itemData.push(item);
    itemData.push(...((item.children as ReactNodeWithChildren[]) || []));
  });

  const itemCount = itemData.length;
  const itemSize = 64;

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

const OuterElementType = React.forwardRef<HTMLDivElement>(function Component(
  props,
  ref
) {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataset = data[index];

  return (
    <div
      {...dataset[0]}
      style={{
        ...style,
        alignItems: 'flex-start',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        top: style.top + PADDING,
      }}
    >
      <span>{dataset[1].dedicated_to}</span>
      <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{dataset[1].patron}</span>
    </div>
  );
}

function useResetCache(data: number) {
  const ref = React.useRef<VariableSizeList>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);

  return ref;
}

export default function SearchBar(props: {
  onChange: (data: PaveStoneProps) => void;
  options: PaveStoneProps[];
  style: React.CSSProperties;
}): JSX.Element {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedValue, setSelectedValue] = React.useState<PaveStoneProps>({});

  function clear() {
    props.onChange({});
    setInputValue('');
    setSelectedValue({});
  }

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    value: PaveStoneProps | null
  ) {
    setSelectedValue(value ?? {});
    props.onChange(value ?? {});
  }

  return (
    <Autocomplete
      filterOptions={filterOptions}
      getOptionLabel={(option: PaveStoneProps) => option.dedicated_to ?? ''}
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      ListboxComponent={ListboxComponent}
      noOptionsText="No results"
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
      renderOption={(props, option) => [props, option] as React.ReactNode}
      style={props.style}
      value={selectedValue}
    />
  );
}
