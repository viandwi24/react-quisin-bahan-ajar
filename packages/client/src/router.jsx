import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import { IndexPage } from "./pages";
import { PlayPage } from "./pages/play";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/play/:id",
    element: <PlayPage />,
  },
]);
