import Button from '@mui/material/Button';
import createPanZoom from 'panzoom';
import Head from 'next/head';
import React from 'react';
import Typography from '@mui/material/Typography';

import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import Certificate from '../components/Certificate';
import Form from '../components/Form';
import Marker from '../components/Marker';
import SearchBar from '../components/SearchBar';

import styles from '../styles/Home.module.css';

const modes = ['Regular', 'Insert', 'Edit'];

const REGULAR_MODE = 0;
const INSERT_MODE = 1;
const EDIT_MODE = 2;

export default function Home() {
  const [form, setForm] = React.useState({ data: null, open: false });
  const [marker, setMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [mode, setMode] = React.useState(REGULAR_MODE);
  const [selected, setSelected] = React.useState(null);
  const [temp, setTemp] = React.useState(null);
  const [viewport, setViewport] = React.useState(null);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const instance = createPanZoom(ref.current, { filterKey: () => true });

    instance.moveTo(-IMAGE_WIDTH * 0.5, -IMAGE_HEIGHT * 0.5);

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
      if (mode !== REGULAR_MODE) {
        if (event.key === 'Enter') {
          setForm({ data: null, open: true });
        } else if (event.key === 'Escape') {
          toggleMode(true);
        }
      }
    }

    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [mode, setForm, setMarker, toggleMode]);

  function closeForm() {
    setForm({ ...form, open: false });
  }

  function placeMarker(event) {
    if (mode === REGULAR_MODE) return;

    const { offsetX, offsetY } = event.nativeEvent;
    setMarker(<Marker data={{ x: offsetX - 4, y: offsetY - 4 }} insertMode />);
  }

  function renderMarkers() {
    function openForm(data) {
      if (mode === REGULAR_MODE) {
        setForm({ data, open: true });
      }
    }

    return markers.map((data) => {
      if (selected === null) {
        return (
          <Marker
            data={data}
            key={data._id}
            onClick={() => openForm(data)}
          />
        );
      } else if (selected._id === data._id) {
        viewport.zoomAbs(0, 0, 1);

        viewport.smoothMoveTo(
          -selected.x + window.innerWidth * 0.5,
          -selected.y + window.innerHeight * 0.5
        );

        return (
          <Marker
            data={data}
            key={data._id}
            onClick={() => openForm(data)}
          />
        );
      }
    });
  }

  function saveFormData(data, resetForm) {
    fetch(`/api/${data._id ? data._id : ''}`, {
      body: JSON.stringify({ ...data, ...marker?.props.data }),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((json) => {
        setMarkers([...markers, json]);
        setMarker(null);

        setMode(REGULAR_MODE);
        setForm({ data: null, open: false });

        resetForm();
      })
      .catch((error) => console.error(error));
  }

  function toggleMode(regularMode = false) {
    if (mode === EDIT_MODE) {
      setMarkers([...markers, temp]);
      setTemp(null);
    }

    if (mode !== REGULAR_MODE) {
      setMarker(null);
    }

    setMode(mode !== REGULAR_MODE || regularMode ? REGULAR_MODE : INSERT_MODE);
    setSelected(null);
  }

  return (
    <>
      <Head>
        <title>Paving Stones</title>
      </Head>
      <div className={styles.root}>
        <Button className={styles.modeButton} onClick={() => toggleMode()}>
          {modes[mode]} Mode
        </Button>
        {mode === REGULAR_MODE && (
          <SearchBar
            className={styles.searchBar}
            onSelect={(value) => setSelected(value)}
            options={markers}
          />
        )}
        <div className={styles.container} ref={ref}>
          <div
            className={styles.background}
            onClick={placeMarker}
            style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }}
          >
            {renderMarkers()}
            {marker}
          </div>
        </div>
        {mode !== REGULAR_MODE && (
          <Typography className={styles.insertModeTip}>
            Hit Enter to lock marker position and fill form
          </Typography>
        )}
        <Form
          data={form.data}
          onCancel={closeForm}
          onPositionEdit={() => {
            setForm({ ...form, open: !form.open });

            if (mode === REGULAR_MODE) {
              setMarker(<Marker data={form.data} insertMode />);
              setMarkers(
                markers.filter((marker) => {
                  if (marker._id === form.data._id) {
                    setTemp(marker);
                  }

                  return marker._id !== form.data._id;
                })
              );
            } else {
              setMarker(null);
              setMarkers([
                markers,
                <Marker key={form.data._id} data={form.data} />,
              ]);
            }

            setMode(mode === REGULAR_MODE ? EDIT_MODE : REGULAR_MODE);
          }}
          onSave={saveFormData}
          open={form.open}
        />
      </div>
      <Certificate className={styles.printout} data={selected} />
    </>
  );
}
