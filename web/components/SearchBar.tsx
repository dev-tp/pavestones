import { Combobox } from '@headlessui/react';
import React from 'react';

import PaveStoneProps from '../types/PaveStoneProps';

export default function SearchBar(props: {
  onChange: (record: PaveStoneProps | null) => void;
  records: PaveStoneProps[];
  selected: PaveStoneProps;
}): JSX.Element {
  const [query, setQuery] = React.useState<string>('');

  const records =
    query === ''
      ? props.records
      : props.records.filter(
          (record) => record.dedicated_to === query || record.patron === query
        );

  return (
    <Combobox
      nullable
      onChange={(record) => props.onChange(record)}
      value={props.selected}
    >
      <Combobox.Input
        className="w-full rounded-md border-none p-3 text-sm leading-5 text-gray-900 focus:ring-0"
        displayValue={(record: PaveStoneProps) => record?.dedicated_to || ''}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
      />
      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm">
        {records.map((record) => (
          <Combobox.Option
            key={record._id}
            value={record}
            className="relative cursor-default select-none p-2"
          >
            <div>{record.dedicated_to}</div>
            <div>{record.patron}</div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
