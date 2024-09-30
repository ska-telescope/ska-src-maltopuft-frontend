import { AUTH_DISABLED } from '@/config';
import { loginRedirect } from '@/features/auth/api/auth';
import LoginButton from '@/features/auth/components/LoginButton';

function HomePage() {
  if (AUTH_DISABLED === false) {
    loginRedirect();
  }

  return (
    <div>
      <LoginButton />
      <p>
        Redirecting to login. If you are not automatically re-directed, please click the Login
        button above.
      </p>
    </div>
  );
}

export default HomePage;
