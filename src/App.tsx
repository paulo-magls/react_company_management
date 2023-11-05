import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
      <h1>Gerenciador de Empresas</h1>
      <Outlet />
    </div>
  );
}

export default App;