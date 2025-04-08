import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import RootLayout from "../components/root/RootLayout";
import AuthProvider from "../auth/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
