import { Combobox } from '@headlessui/react';
import { Pavestone } from '@prisma/client';
import Fuse from 'fuse.js';
import React from 'react';

export default function SearchBar(props: {
  onChange: (record: Pavestone | null) => void;
  records: Pavestone[];
  selected: Pavestone;
}): JSX.Element {
  const [query, setQuery] = React.useState<string>('');

  const fuse = React.useMemo<Fuse<Pavestone>>(
    () =>
      new Fuse<Pavestone>(props.records, {
        keys: ['dedicated_to', 'patron'],
        threshold: 0.25,
      }),
    [props.records]
  );

  const records = React.useMemo<Pavestone[]>(
    () =>
      query.length > 0
        ? fuse.search(query, { limit: 25 }).map((result) => result.item)
        : props.records?.slice(-10),
    [props.records, query]
  );

  return (
    <Combobox
      nullable
      onChange={(record) => props.onChange(record)}
      value={props.selected}
    >
      <Combobox.Input
        className="w-full rounded-md border-none p-3 text-sm leading-5 text-gray-900 focus:ring-0"
        displayValue={(record: Pavestone) => record?.dedicated_to || ''}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
      />
      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm">
        {records?.map((record) => (
          <Combobox.Option
            key={record.id}
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
