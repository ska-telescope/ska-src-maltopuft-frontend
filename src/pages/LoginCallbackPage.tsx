import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

import { fetchToken } from '@/features/auth/api/login.ts';

function LoginCallbackPage() {
  function getCodeFromURL() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code === null) {
      throw Error('No code provided.');
    }
    return code;
  }

  async function getToken() {
    const code = getCodeFromURL();
    return fetchToken(code);
  }

  const { data, isSuccess } = useQuery({
    queryKey: ['token'],
    queryFn: () => getToken()
  });

  if (isSuccess) {
    localStorage.setItem('maltopuft-token', JSON.stringify(data.token));
    return <Navigate to="/" />;
  }

  return null;
}

export default LoginCallbackPage;
