import React from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  let { data, mutate } = useSWR('/api/user', async (url) => {
    const response = await fetch(url);
    return await response.json();
  });

  React.useEffect(() => {
    if (!redirectTo || !data.user) return;

    if (
      (redirectTo && !redirectIfFound && !data.user) ||
      (redirectIfFound && data.user)
    ) {
      Router.push(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo]);

  if (!data) {
    data = { user: null };
  }

  return { data, mutate };
}
