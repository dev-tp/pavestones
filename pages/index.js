import React from 'react';

import Form from '../components/Form';
import Map from '../components/Map';
import Marker from '../components/Marker';
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
      ...form.data,
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
      <button onClick={toggleMode} style={{ position: 'absolute', zIndex: 1 }}>
        {modes[mode]}
      </button>
      <Map onClick={placeMarker}>{render()}</Map>
      <Form
        data={form.data}
        onCancel={() => setForm({ ...form, open: false })}
        onDelete={deleteMarker}
        onPositionEdit={editMarkerPosition}
        onSave={saveFormData}
        open={form.open}
      />
      {/* <Certificate className={styles.printout} data={selected} /> */}
    </>
  );
}
