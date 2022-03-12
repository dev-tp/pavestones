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

  function closeForm() {
    setForm({ open: false });
    setMarker(null);
  }

  function handleModeButton() {
    if (insertMode) setMarker(null);

    setInsertMode(!insertMode);
    setSelected(null);
  }

  function placeMarker(event) {
    if (!insertMode) return;

    const { offsetX, offsetY } = event.nativeEvent;
    setMarker(<Marker data={{ x: offsetX - 4, y: offsetY - 4 }} insertMode />);
  }

  function renderMarkers() {
    return markers.map((data) => {
      if (selected === null) {
        return <Marker key={data._id} data={data} />;
      } else if (selected._id === data._id) {
        viewport.zoomAbs(0, 0, 1);

        viewport.smoothMoveTo(
          -selected.x + window.innerWidth * 0.5,
          -selected.y + window.innerHeight * 0.5
        );

        return <Marker key={data._id} data={data} />;
      }
    });
  }

  function saveFormData(data, resetForm) {
    fetch('/api', {
      body: JSON.stringify({ ...data, ...marker.props.data }),
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
  }

  return (
    <>
      <Head>
        <title>Paving Stones</title>
      </Head>
      <div className={styles.root}>
        <Button className={styles.modeButton} onClick={handleModeButton}>
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
            onClick={placeMarker}
            style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }}
          >
            {renderMarkers()}
            {marker}
          </div>
        </div>
        {insertMode && (
          <Typography className={styles.insertModeTip}>
            Hit Enter to lock marker position and fill form
          </Typography>
        )}
        <Form onCancel={closeForm} onSave={saveFormData} open={form.open} />
      </div>
      <Certificate className={styles.printout} data={selected} />
    </>
  );
}
