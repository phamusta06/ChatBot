
import { StrictMode } from 'react';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/RoutesPage.tsx';
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <HelmetProvider>
      <RouterProvider router={router} />
   </HelmetProvider>
  </StrictMode>
);
