import Button from '@mui/material/Button';
import panZoom from 'panzoom';
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

  React.useEffect(() => panZoom(ref.current).moveTo(-7000 / 2, -5500 / 2), []);

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

            const { offsetX, offsetY } = event.nativeEvent;
            setMarker(<Marker x={offsetX - 4} y={offsetY - 4} insertMode />);
          }}
          style={{
            backgroundColor: '#000',
            backgroundImage: 'url("/images/cathedral-color.png")',
            display: 'block',
            height: 5500,
            position: 'relative',
            width: 7000,
          }}
        >
          {markers}
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
        onCancel={(event) => {
          event.stopPropagation();
          setForm({ open: false });
          setMarker(null);
        }}
        onSave={(event) => {
          event.stopPropagation();

          setMarkers([
            ...markers,
            <Marker key={0} x={marker.props.x} y={marker.props.y} />,
          ]);
          setMarker(null);

          setInsertMode(false);
          setForm({ open: false });
        }}
        open={form.open}
      />
    </div>
  );
}
