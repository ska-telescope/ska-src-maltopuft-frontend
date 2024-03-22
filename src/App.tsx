import { useState } from 'react';

import './App.css';

import { doPing } from '@/ping/ping';

function App() {
  const [data, setData] = useState<{ data: string }>({ data: 'none' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await doPing();
    setData(response);
    setIsLoading(false);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {data.data}
      </button>
      {isLoading && <h2>Loading...</h2>}
    </div>
  );
}

export default App;
