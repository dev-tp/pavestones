import Button from '@mui/material/Button';
import createPanZoom from 'panzoom';
import React from 'react';
import Typography from '@mui/material/Typography';

import Form from '../components/Form';
import Marker from '../components/Marker';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [form, setForm] = React.useState({ open: false });
  const [insertMode, setInsertMode] = React.useState(false);
  const [marker, setMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const viewport = createPanZoom(ref.current, { filterKey: () => true });
    viewport.moveTo(-7000 / 2, -5500 / 2);
  }, []);

  React.useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((json) => setMarkers(json))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    function handleKeyUp(event) {
      if (insertMode) {
        if (event.key === 'Enter') {
          setForm({ open: true });
        } else if (event.key === 'Escape') {
          setInsertMode(false);
          setMarker(null);
        }
      }
    }

    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [insertMode, setForm, setMarker]);

  return (
    <div>
      <Button
        onClick={() => {
          if (insertMode) setMarker(null);
          setInsertMode(!insertMode);
        }}
        style={{ color: '#fff', position: 'fixed', top: 10, zIndex: 1 }}
      >
        {insertMode ? 'Insert' : 'Regular'} Mode
      </Button>
      <SearchBar
        onSelect={(value) => console.log(value)}
        options={markers}
        style={{
          borderRadius: 6,
          display: 'flex',
          left: '50%',
          padding: '4px 6px 4px 12px',
          position: 'fixed',
          top: 10,
          transform: 'translate(-50%)',
          width: 400,
          zIndex: 1,
        }}
      />
      <div
        ref={ref}
        style={{ bottom: 0, left: 0, position: 'fixed', right: 0, top: 0 }}
      >
        <div
          onClick={(event) => {
            if (!insertMode) {
              return;
            }

            setMarker(
              <Marker
                data={{
                  x: event.nativeEvent.offsetX - 4,
                  y: event.nativeEvent.offsetY - 4,
                }}
                insertMode
              />
            );
          }}
          style={{
            backgroundColor: '#000',
            backgroundImage: 'url("/images/cathedral-color.png")',
            height: 5500,
            position: 'relative',
            width: 7000,
          }}
        >
          {markers.map((data) => (
            <Marker key={data._id} data={data} />
          ))}
          {marker}
        </div>
      </div>
      {insertMode && (
        <Typography
          style={{
            bottom: 10,
            color: '#fff',
            left: '50%',
            position: 'fixed',
            transform: 'translate(-50%)',
          }}
        >
          Hit Enter to lock marker position and fill form
        </Typography>
      )}
      <Form
        onCancel={() => {
          setForm({ open: false });
          setMarker(null);
        }}
        onSave={(form, resetForm) => {
          const data = { ...form, ...marker.props.data };

          fetch('/api', {
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            mode: 'cors',
          })
            .then((response) => response.json())
            .then((json) => {
              setMarkers([...markers, json]);
              setMarker(null);

              setInsertMode(false);
              setForm({ open: false });

              resetForm();
            })
            .catch((error) => console.error(error));
        }}
        open={form.open}
      />
    </div>
  );
}
