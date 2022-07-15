import Button from '@mui/material/Button';
import React from 'react';

import Certificate from '../components/Certificate';
import Form from '../components/Form';
import Map from '../components/Map';
import Marker from '../components/Marker';
import SearchBar from '../components/SearchBar';
import schema from '../lib/schema';

const REGULAR_MODE = 0;
const INSERT_MODE = 1;
const EDIT_MODE = 2;

const modes = ['Regular', 'Insert', 'Edit'];

export default function Home() {
  const [form, setForm] = React.useState({ data: schema, open: false });
  const [marker, setMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [mode, setMode] = React.useState(REGULAR_MODE);
  const [searchValue, setSearchValue] = React.useState(null);

  const toggleMode = React.useCallback(() => {
    setMode(mode === REGULAR_MODE ? INSERT_MODE : REGULAR_MODE);
    setMarker(null);
  }, [mode]);

  React.useEffect(
    () =>
      fetch('/api')
        .then((response) => response.json())
        .then((json) => setMarkers(json)),
    [setMarkers]
  );

  React.useEffect(() => {
    if (mode === REGULAR_MODE) {
      return;
    }

    const handleKeyUp = (event) => {
      if (event.key === 'Enter') {
        setForm({ data: marker, open: true });
      } else if (event.key === 'Escape') {
        toggleMode();
      }
    };

    window.addEventListener('keyup', handleKeyUp, false);

    return () => window.removeEventListener('keyup', handleKeyUp, false);
  }, [marker, mode, setForm, toggleMode]);

  async function deleteMarker(data) {
    if (confirm('Are you sure you want to delete this entry?')) {
      const response = await fetch(`/api/${data._id}`, {
        method: 'DELETE',
      });

      if ((await response.json()).ok) {
        setForm({ data: schema, open: false });
        setMarkers(markers.filter((marker) => marker._id !== data._id));
      }
    }
  }

  // TODO Pass form-data as parameter in case user updates data without
  // committing updates
  function editMarkerPosition() {
    setForm({ ...form, open: false });
    setMarker(form.data);
    setMode(EDIT_MODE);
  }

  function placeMarker(event) {
    if (mode === REGULAR_MODE) {
      return;
    }

    setMarker({
      ...(mode === INSERT_MODE ? schema : form.data),
      x: event.nativeEvent.offsetX - 4,
      y: event.nativeEvent.offsetY - 4,
    });
  }

  function render() {
    const openForm = (data) => {
      if (mode === REGULAR_MODE) {
        setForm({ data, open: true });
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

  async function saveFormData(data) {
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
    if (!data._id) {
      setMarkers([...markers, json]);
    } else {
      setMarkers(
        markers.map((marker) => (marker._id === json._id ? json : marker))
      );
    }

    setMarker(null);

    setMode(REGULAR_MODE);
    setForm({ data: schema, open: false });
  }

  return (
    <>
      <div id="home">
        <Button
          onClick={toggleMode}
          size="large"
          style={{
            borderColor: '#fff',
            color: '#fff',
            left: '1rem',
            position: 'absolute',
            top: '1rem',
            zIndex: 1,
          }}
          variant="outlined"
        >
          {modes[mode]}
        </Button>
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
        <Map coordinate={searchValue} onClick={placeMarker}>
          {render()}
        </Map>
      </div>
      <Form
        data={form.data}
        onCancel={() => setForm({ ...form, open: false })}
        onDelete={deleteMarker}
        onPositionEdit={editMarkerPosition}
        onSave={saveFormData}
        open={form.open}
      />
      <Certificate data={form.data} />
    </>
  );
}
