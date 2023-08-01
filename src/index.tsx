import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getRates } from './rates';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

getRates().then((result) => {
  const rates =
    result && result.data && Object.values(result.data).length
      ? result
      : undefined;

  root.render(
    <StrictMode>
      <App currentRates={rates} />
    </StrictMode>
  );
});
