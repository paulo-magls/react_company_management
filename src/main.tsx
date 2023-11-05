import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Home from './routes/Home.tsx';
import SearchPage from "./routes/SearchPage.tsx";
import Register from "./routes/Register.tsx";
import ErrorPage from './routes/ErrorPage.tsx';
import EditPage from './routes/EditPage.tsx';
import SuccessfulPage from './routes/SuccessfulPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/consulta",
        element: <SearchPage />
      },
      {
        path: "/cadastro",
        element: <Register />
      },
      {
        path: "/detalhes/:cnpj",
        element: <EditPage />
      },
      {
        path: "/pagina_de_sucesso",
        element: <SuccessfulPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
