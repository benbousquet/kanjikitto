import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import KanjiPractice from "./kanjiPractice/kanjiPractice.tsx";
import DeckViewList from "./deckList/deckListView.tsx";
import Navbar from "./navigation/navbar.tsx";
import Profile from "./user/profile.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import ProtectedRoute from "./auth/protectedRoute.tsx";

const NavbarLayout = () => {
  return (
    <AuthProvider>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <DeckViewList />,
      },
      {
        path: "/study/:deckId",
        element: <KanjiPractice />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
