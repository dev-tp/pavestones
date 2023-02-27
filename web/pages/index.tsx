import Head from 'next/head';
import React from 'react';

import Certificate from '../components/Certificate';
import Form from '../components/Form';
import Map from '../components/Map';
import Marker from '../components/Marker';
import SearchBar from '../components/SearchBar';

import { useUser } from '../lib/useUser';
import PaveStoneProps from '../types/PaveStoneProps';

const REGULAR_MODE = 0;
const INSERT_MODE = 1;
const EDIT_MODE = 2;

const modes = ['Regular', 'Insert', 'Edit'];

export default function Home(): JSX.Element {
  const [form, setForm] = React.useState<{
    data: PaveStoneProps;
    isOpen: boolean;
  }>({
    data: {},
    isOpen: false,
  });
  const [marker, setMarker] = React.useState<PaveStoneProps>({});
  const [markers, setMarkers] = React.useState<PaveStoneProps[]>([]);
  const [mode, setMode] = React.useState<number>(REGULAR_MODE);
  const [searchValue, setSearchValue] = React.useState<PaveStoneProps>({});

  const { data, mutate } = useUser();

  const toggleMode = React.useCallback(() => {
    setMode(mode === REGULAR_MODE ? INSERT_MODE : REGULAR_MODE);
    setMarker({});
  }, [mode]);

  React.useEffect(() => {
    async function fetchMarkers() {
      const response = await fetch('/api');
      const json = await response.json();

      setMarkers(json);
    }

    fetchMarkers();
  }, [setMarkers]);

  React.useEffect(() => {
    if (mode === REGULAR_MODE) {
      return;
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setForm({ data: marker, isOpen: true });
      } else if (event.key === 'Escape') {
        toggleMode();
      }
    };

    window.addEventListener('keyup', handleKeyUp, false);

    return () => window.removeEventListener('keyup', handleKeyUp, false);
  }, [marker, mode, setForm, toggleMode]);

  async function deleteMarker(data: PaveStoneProps) {
    if (confirm('Are you sure you want to delete this entry?')) {
      const response = await fetch(`/api/${data._id}`, {
        method: 'DELETE',
      });

      if ((await response.json()).ok) {
        setForm({ data: {}, isOpen: false });
        setMarkers(markers.filter((marker) => marker?._id !== data._id));
      }
    }
  }

  // TODO Pass form-data as parameter in case user updates data without
  // committing updates
  function editMarkerPosition() {
    setForm({ ...form, isOpen: false });
    setMarker(form.data);
    setMode(EDIT_MODE);
  }

  async function logout(): Promise<void> {
    const response = await fetch('/api/auth', { method: 'DELETE' });

    if (response.ok) {
      mutate({ user: null });
    }
  }

  function placeMarker(event: React.SyntheticEvent<Element, MouseEvent>) {
    if (mode === REGULAR_MODE) {
      return;
    }

    setMarker({
      ...(mode === INSERT_MODE ? {} : form.data),
      coordinate: {
        x: event.nativeEvent.offsetX - 4,
        y: event.nativeEvent.offsetY - 4,
      },
    });
  }

  function render(): JSX.Element {
    const openForm = (data: PaveStoneProps) => {
      if (mode === REGULAR_MODE) {
        setForm({ data, isOpen: true });
      }
    };

    return (
      <>
        {markers.map((data, i) => {
          if (marker && marker._id === data._id) {
            return null;
          }

          if (searchValue && searchValue._id === data._id) {
            return (
              <Marker
                data={data}
                key={i}
                onClick={() => openForm(data)}
                searchResult
              />
            );
          }

          return <Marker data={data} key={i} onClick={() => openForm(data)} />;
        })}
        {marker && <Marker data={marker} insertMode />}
      </>
    );
  }

  async function saveFormData(data: PaveStoneProps): Promise<void> {
    const response = await fetch(`/api/${data._id || ''}`, {
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
    });

    const json = await response.json();

    // If `data._id` is undefined, then `json` is a new entry.
    // Otherwise, it is an update to an entry.
    if (data._id === undefined) {
      setMarkers([...markers, json]);
    } else {
      setMarkers(
        markers.map((marker) => (marker._id === json._id ? json : marker))
      );
    }

    setMarker({});

    setMode(REGULAR_MODE);
    setForm({ data: {}, isOpen: false });
  }

  return (
    <>
      <Head>
        <title>Paving Stones</title>
      </Head>
      <div className="bg-zinc-800">
        {data.user && (
          <button
            className="absolute top-4 left-4 z-10 rounded-md border border-white px-4 py-2 text-white"
            onClick={toggleMode}
          >
            {modes[mode]}
          </button>
        )}
        <SearchBar
          onChange={setSearchValue}
          options={markers}
          style={{
            left: '50%',
            position: 'absolute',
            top: '1rem',
            transform: 'translate(-50%)',
            width: 400,
            zIndex: 1,
          }}
        />
        </div>
        {data.user ? (
          <button
            className="absolute right-4 top-4 z-10 rounded-md border border-white px-4 py-2 text-white"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <a
            className="absolute right-4 top-4 z-10 rounded-md border border-white px-4 py-2 text-white"
            href="/login"
          >
            Login
          </a>
        )}
        <Map coordinate={searchValue.coordinate} onClick={placeMarker}>
          {render()}
        </Map>
        {mode !== REGULAR_MODE && (
          <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform text-white">
            Press Enter to lock position and fill form.
          </span>
        )}
      </div>
      <Form
        data={form.data}
        isOpen={form.isOpen}
        onCancel={() => setForm({ data: {}, isOpen: false })}
        onDelete={deleteMarker}
        onPositionEdit={editMarkerPosition}
        onSave={saveFormData}
      />
      {form.isOpen && <Certificate data={form.data} />}
    </>
  );
}
