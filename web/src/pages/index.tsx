import { Pavestone } from '@prisma/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { trpc } from '../utils/trpc';
import Certificate from '../components/Certificate';
import Form from '../components/Form';
import Map from '../components/Map';
import Marker from '../components/Marker';
import SearchBar from '../components/SearchBar';

const REGULAR_MODE = 0;
const INSERT_MODE = 1;
const EDIT_MODE = 2;

const modes = ['Regular', 'Insert', 'Edit'];

export default function Home(): JSX.Element {
  const [form, setForm] = React.useState<{
    data: Pavestone;
    isOpen: boolean;
  }>({
    data: {} as Pavestone,
    isOpen: false,
  });
  const [marker, setMarker] = React.useState<Pavestone>({} as Pavestone);
  const [mode, setMode] = React.useState<number>(REGULAR_MODE);
  const [searchValue, setSearchValue] = React.useState<Pavestone>(
    {} as Pavestone
  );

  const router = useRouter();
  const utils = trpc.useContext();

  const logout = trpc.session.logout.useMutation({
    onSuccess: () => router.reload(),
    onError: (error) => console.error(error.message),
  });

  const markers = {
    add: trpc.pavestones.add.useMutation({
      onSuccess: () => utils.pavestones.invalidate(),
    }),
    delete: trpc.pavestones.delete.useMutation({
      onSuccess: () => utils.invalidate(),
    }),
    list: trpc.pavestones.list.useQuery(),
    update: trpc.pavestones.update.useMutation({
      onSuccess: () => utils.invalidate(),
    }),
  };

  const user = trpc.session.user.useQuery().data;

  const toggleMode = React.useCallback(() => {
    setMode(mode === REGULAR_MODE ? INSERT_MODE : REGULAR_MODE);
    setMarker({} as Pavestone);
  }, [mode]);

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

  async function deleteMarker(data: Pavestone) {
    if (confirm('Are you sure you want to delete this entry?')) {
      await markers.delete.mutateAsync(data);
      setForm({ data: {} as Pavestone, isOpen: false });
    }
  }

  // TODO Pass form-data as parameter in case user updates data without
  // committing updates
  function editMarkerPosition() {
    setForm({ ...form, isOpen: false });
    setMarker(form.data);
    setMode(EDIT_MODE);
  }

  function placeMarker(event: React.SyntheticEvent<Element, MouseEvent>) {
    if (mode === REGULAR_MODE) {
      return;
    }

    setMarker({
      ...(mode === INSERT_MODE ? ({} as Pavestone) : form.data),
      x: event.nativeEvent.offsetX - 4,
      y: event.nativeEvent.offsetY - 4,
    });
  }

  function render(): JSX.Element {
    const openForm = (data: Pavestone) => {
      if (mode === REGULAR_MODE) {
        setForm({ data, isOpen: true });
      }
    };

    return (
      <>
        {markers.list.data?.map((data: Pavestone, i: number) => {
          if (marker && marker.id === data.id) {
            return null;
          }

          if (searchValue && searchValue.id === data.id) {
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

  async function saveFormData(data: Pavestone): Promise<void> {
    if (data.id) {
      await markers.update.mutateAsync(data);
    } else {
      await markers.add.mutateAsync(data);
    }

    setMarker({} as Pavestone);
    setMode(REGULAR_MODE);
    setForm({ data: {} as Pavestone, isOpen: false });
  }

  return (
    <>
      <Head>
        <title>Paving Stones</title>
      </Head>
      <div className="bg-zinc-800">
        {user?.isLoggedIn && (
          <button
            className="absolute top-4 left-4 z-10 rounded-md border border-white px-4 py-2 text-white"
            onClick={toggleMode}
          >
            {modes[mode]}
          </button>
        )}
        <div className="absolute top-4 left-1/2 z-10 w-1/4 -translate-x-1/2 transform">
          <SearchBar
            onChange={(record) => setSearchValue(record || ({} as Pavestone))}
            records={markers.list.data as Pavestone[]}
            selected={searchValue}
          />
        </div>
        {user?.isLoggedIn ? (
          <button
            className="absolute right-4 top-4 z-10 rounded-md border border-white px-4 py-2 text-white"
            onClick={async () => await logout.mutateAsync()}
          >
            Logout
          </button>
        ) : (
          <Link
            className="absolute right-4 top-4 z-10 rounded-md border border-white px-4 py-2 text-white"
            href="/login"
          >
            Login
          </Link>
        )}
        <Map x={searchValue.x} y={searchValue.y} onClick={placeMarker}>
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
        onCancel={() => setForm({ data: {} as Pavestone, isOpen: false })}
        onDelete={deleteMarker}
        onPositionEdit={editMarkerPosition}
        onSave={saveFormData}
      />
      {form.isOpen && <Certificate data={form.data} />}
    </>
  );
}
