import { useRouter } from 'next/router';
import React from 'react';

import { trpc } from '../utils/trpc';

export default function Login(): JSX.Element {
  const [error, setError] = React.useState<string>('');

  const router = useRouter();

  const login = trpc.session.login.useMutation({
    onSuccess: () => router.push('/'),
    onError: (error) => setError(error.message),
  });

  const password = React.useRef<HTMLInputElement>(null);
  const username = React.useRef<HTMLInputElement>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();

    if (username.current) {
      login.mutate({ username: username.current.value });
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute -inset-10 bg-[url('/images/floor-plan.png')] bg-cover bg-center blur-sm invert" />
      <form
        className="z-10 grid w-1/4 gap-4 rounded-lg bg-white p-4 drop-shadow-lg"
        onSubmit={submit}
      >
        <span className="text-xl">Pave Stones</span>
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
        <button className="rounded-md bg-blue-500 p-2 text-white drop-shadow-md">
          Login
        </button>
      </form>
    </div>
  );
}
