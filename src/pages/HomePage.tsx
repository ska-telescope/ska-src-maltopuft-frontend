import LoginButton from '@/features/auth/components/LoginButton';
import { doPing } from '@/features/health/ping';

function HomePage() {
  return (
    <div>
      <LoginButton />
      <button type="button" onClick={doPing}>
        Ping backend
      </button>
    </div>
  );
}

export default HomePage;
