import { loginRedirect } from '@/features/auth/api/auth';

function LoginButton() {
  return (
    <div>
      <button type="button" onClick={loginRedirect}>
        Login
      </button>
    </div>
  );
}

export default LoginButton;
