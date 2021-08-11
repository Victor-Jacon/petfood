import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';
import Cadastro from './pages/cadastro';
import Checkout from './pages/checkout';
import Petshop from './pages/petshop';
import Sidebar from './components/sidebar' /* Sidebar 11/11 - Importamos nesta linha, e depois, implementamos ali embaixo */

ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
    <Petshop />
  </React.StrictMode>,
  document.getElementById('root')
);