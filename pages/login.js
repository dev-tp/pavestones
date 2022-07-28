import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useUser } from '../lib/useUser';

export default function Login() {
  const [error, setError] = React.useState(null);

  const { mutate } = useUser({ redirectTo: '/', redirectIfFound: true });

  const password = React.useRef();
  const username = React.useRef();

  async function submit(event) {
    event.preventDefault();

    const response = await fetch('/api/auth', {
      body: JSON.stringify({
        password: password.current.value,
        username: username.current.value,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const json = await response.json();

    if (json.error) {
      return setError(json.error);
    }

    mutate(json, false);
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'url(/images/floor-plan.png)',
          backgroundPositionY: '50%',
          backgroundSize: 'cover',
          filter: 'brightness(2) blur(10px) invert(1)',
          inset: -10,
          position: 'absolute',
          zIndex: -1,
        }}
      />
      <Paper
        component="form"
        elevation={3}
        onSubmit={submit}
        style={{ padding: '3rem 2rem' }}
      >
        {error && (
          <Typography
            color="error"
            style={{ marginBottom: '1rem', textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          inputRef={username}
          label="Username"
          style={{ marginBottom: '1rem' }}
          variant="standard"
        />
        <TextField
          fullWidth
          inputRef={password}
          label="Password"
          style={{ marginBottom: '3rem' }}
          type="password"
          variant="standard"
        />
        <Button
          fullWidth
          size="large"
          style={{ textTransform: 'capitalize' }}
          type="submit"
          variant="outlined"
        >
          Login
        </Button>
      </Paper>
    </div>
  );
}
