import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./authRoutes";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import { Home } from "../pages/home/Home";
import { Layout } from "../pages/Layout";
import Chat from "../pages/chat/Chat";
import { History } from "../pages/history/History";

 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
       { path: "signup", element: <PublicRoute element={Signup} /> },
      { path: "login", element: <PublicRoute element={Login} /> },
      
       {
        path: "",
        element: <PrivateRoute element={Layout} />,
        children: [
          { path: "/", element: <Home /> },
          { path: "chat/:id", element: <Chat /> },
          { path: "history", element: <History /> },
        ],
      },
      
      { path: "*", element: <Layout /> },
    ],
  },
]);

export default router;
