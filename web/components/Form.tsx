import { Dialog, Switch } from '@headlessui/react';
import {
  MapPinIcon,
  PrinterIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

import FormProps from '../types/FormProps';
import PaveStoneProps from '../types/PaveStoneProps';

export default function Form(props: FormProps): JSX.Element {
  const dedicatedTo = React.createRef<HTMLInputElement>();
  const patron = React.createRef<HTMLInputElement>();

  let isDeceased = false;

  function getCurrentData(): PaveStoneProps {
    return {
      ...props.data,
      dedicated_to: dedicatedTo.current?.value,
      is_deceased: isDeceased,
      patron: patron.current?.value,
    };
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey && event.key === 'Enter') {
      props.onSave(getCurrentData());
    } else if (event.key === 'Escape') {
      props.onCancel();
    }
  }

  return (
    <Dialog
      className="relative z-20"
      onClose={props.onCancel}
      onKeyUp={handleKeyUp}
      open={props.isOpen}
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="flex w-1/3 flex-col rounded-md bg-white p-4 pb-2">
            {props.data._id && (
              <div className="flex justify-end">
                <button
                  className="px-1"
                  onClick={() => props.onPositionEdit(getCurrentData())}
                >
                  <MapPinIcon className="h-5 w-5" />
                </button>
                <button className="px-1" onClick={print}>
                  <PrinterIcon className="h-5 w-5" />
                </button>
                <button
                  className="px-1"
                  onClick={() => props.onDelete(getCurrentData())}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            )}
            <label>Patron</label>
            <input
              className="mb-3 rounded-md border p-2"
              defaultValue={props.data.patron}
              ref={patron}
              type="text"
            />
            <label>Dedicated to</label>
            <input
              className="mb-3 rounded-md border p-2"
              defaultValue={props.data.dedicated_to}
              ref={dedicatedTo}
              type="text"
            />
            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  as={React.Fragment}
                  defaultChecked={props.data.is_deceased}
                  name="is-deceased"
                  onChange={(checked) => (isDeceased = checked)}
                >
                  {({ checked }) => (
                    <button
                      className={`${
                        checked ? 'bg-blue-500' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          checked ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  )}
                </Switch>
                <Switch.Label className="ml-2">Deceased</Switch.Label>
              </div>
            </Switch.Group>
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 text-sm uppercase text-gray-500"
                onClick={props.onCancel}
              >
                Cancel
              </button>
              <button
                className="p-2 text-sm uppercase text-blue-500"
                onClick={() => props.onSave(getCurrentData())}
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
