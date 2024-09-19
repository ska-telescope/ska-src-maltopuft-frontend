import { AUTH_API_URL, ROOT } from '@/config';

/**
 * Redirect user to login via SKA-IAM. After successful login, the user is
 * redirected to the /callback route. This route runs the login callback
 * functions, which parse the PCKE code from the URL and fetch the user's
 * access token.
 */
export function loginRedirect() {
  // Login via SKA IAM and redirect to LoginCallbackPage
  window.location.href = `${AUTH_API_URL}/login/code?redirect_uri=${ROOT}/callback`;
}

export function logout() {
  localStorage.removeItem('maltopuft-token'); // Clear the token
  window.location.href = ROOT;
}
