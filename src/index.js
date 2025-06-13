import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Mengimpor komponen App
import './index.css'; // Mengimpor file CSS

// Merender komponen App ke dalam elemen dengan ID "root"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
