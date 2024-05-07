import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import KanjiPractice from "./kanjiPractice/kanjiPractice.tsx";
import DeckViewList from "./deckList/deckListView.tsx";
import Navbar from "./navigation/navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/study/:deckId",
    element: <KanjiPractice />,
  },
  {
    path: "/",
    element: <DeckViewList />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
