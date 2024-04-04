import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="lime" grayColor="sage">
      <App />
      {/* <ThemePanel /> */}
    </Theme>
  </React.StrictMode>
);
