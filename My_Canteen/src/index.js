// index.js

import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client
//import './index.css'; // Import your global CSS file if needed
import App from './App'; // Import the root component of your application

import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
