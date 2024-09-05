import { StrictMode } from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/RoutesPage.tsx";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { UserContextProvider } from "./context/userContext.tsx";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimatePresence>
      <HelmetProvider>
        <UserContextProvider>
          <Toaster />
          <RouterProvider router={router} />
        </UserContextProvider>
      </HelmetProvider>
    </AnimatePresence>
  </StrictMode>
);
