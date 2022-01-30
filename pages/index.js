import Button from '@material-ui/core/Button';
import Head from 'next/head';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import Marker from '../components/Marker';

export default function Home() {
  const [insertMode, setInsertMode] = React.useState(false);
  const [marker, setMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  React.useEffect(() => {
    const randomMarkers = [];

    for (let i = 0; i < 100; i++) {
      randomMarkers.push(
        <Marker
          key={i}
          x={Math.floor(Math.random() * document.body.scrollWidth)}
          y={Math.floor(Math.random() * document.body.scrollHeight)}
        />
      );
    }

    setMarkers(randomMarkers);
  }, []);

  return (
    <div
      onClick={(event) => {
        if (insertMode) {
          setMarker(<Marker x={event.pageX - 6} y={event.pageY - 6} />);
        }
      }}
    >
      <Head>
        <link rel="icon" href="/icons/icon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paver</title>
      </Head>
      <Button
        onClick={(event) => {
          event.stopPropagation();

          if (insertMode) {
            setMarker(null);
          }

          setInsertMode(!insertMode);
        }}
        style={{
          color: '#fff',
          left: 10,
          position: 'fixed',
          top: 10,
        }}
      >
        {insertMode ? 'Regular' : 'Insert'} Mode
      </Button>
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
          Hit Enter to lock point and fill information
        </Typography>
      )}
      <img src="/images/cathedral-color.png" alt="background" />
      {markers}
      {marker}
    </div>
  );
}
