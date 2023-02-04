import React from 'react';

import { useUser } from '../lib/useUser';

export default function Login(): JSX.Element {
  const [error, setError] = React.useState<string>('');

  const { mutate } = useUser({ redirectTo: '/', redirectIfFound: true });

  const password = React.useRef<HTMLInputElement>(null);
  const username = React.useRef<HTMLInputElement>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth', {
        body: JSON.stringify({
          password: password.current?.value,
          username: username.current?.value,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const json = await response.json();

      if (json.error) {
        return setError(json.error);
      }

      mutate(json, false);
    } catch (_) {
      setError('There was a server error. Please try again later.');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute inset-0 bg-[url('/images/floor-plan.png')] bg-cover bg-center blur-md invert" />
      <form
        className="z-10 grid w-1/4 gap-4 rounded-lg bg-white p-4 drop-shadow-md"
        onSubmit={submit}
      >
        {error && (
          <span className="text-center text-sm text-red-500">{error}</span>
        )}
        <input
          className="rounded-md border p-2"
          placeholder="Username"
          ref={username}
          type="text"
        />
        <input
          className="rounded-md border p-2"
          placeholder="Password"
          ref={password}
          type="password"
        />
        <button className="rounded-md bg-blue-500 p-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
