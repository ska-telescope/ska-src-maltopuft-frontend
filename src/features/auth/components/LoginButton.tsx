import { AUTH_API_URL, ROOT } from '@/config';

function LoginButton() {
  function doLogin() {
    // Login via SKA IAM and redirect to LoginCallbackPage
    window.location.href = `${AUTH_API_URL}/login/code?redirect_uri=${ROOT}/callback`;
  }

  return (
    <div>
      <button type="button" onClick={doLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginButton;
