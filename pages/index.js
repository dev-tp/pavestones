import Button from '@mui/material/Button';
import createPanZoom from 'panzoom';
import React from 'react';
import Typography from '@mui/material/Typography';

import Form from '../components/Form';
import Marker from '../components/Marker';
import SearchBar from '../components/SearchBar';

import styles from '../styles/Home.module.css';

const IMAGE_HEIGHT = 5500;
const IMAGE_WIDTH = 7000;

export default function Home() {
  const [form, setForm] = React.useState({ open: false });
  const [insertMode, setInsertMode] = React.useState(false);
  const [marker, setMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [viewport, setViewport] = React.useState(null);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const instance = createPanZoom(ref.current, { filterKey: () => true });

    instance.moveTo(-IMAGE_WIDTH / 2, -IMAGE_HEIGHT / 2);

    setViewport(instance);
  }, [setViewport]);

  React.useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((json) => setMarkers(json))
      .catch((error) => console.error(error));
  }, [setMarkers]);

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
        className={styles.modeButton}
        onClick={() => {
          if (insertMode) setMarker(null);
          setInsertMode(!insertMode);
          setSelected(null);
        }}
      >
        {insertMode ? 'Insert' : 'Regular'} Mode
      </Button>
      {!insertMode && (
        <SearchBar
          className={styles.searchBar}
          onSelect={(value) => setSelected(value)}
          options={markers}
        />
      )}
      <div className={styles.container} ref={ref}>
        <div
          className={styles.background}
          onClick={(event) => {
            if (!insertMode) return;
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
          style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }}
        >
          {markers.map((data) => {
            if (selected === null) {
              return <Marker key={data._id} data={data} />;
            } else if (selected._id === data._id) {
              viewport.zoomAbs(0, 0, 1);

              viewport.smoothMoveTo(
                -selected.x + window.innerWidth / 2,
                -selected.y + window.innerHeight / 2
              );

              return <Marker key={data._id} data={data} />;
            }
          })}
          {marker}
        </div>
      </div>
      {insertMode && (
        <Typography className={styles.insertModeTip}>
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
