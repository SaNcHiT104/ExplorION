import { useState } from "react";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import DashBoard from "./Components/DashBoard/DashBoard";
import Transaction from "./Components/Transaction/Transaction";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Savings from "./Components/Savings/Savings";
import Analytics from "./Components/Analytics/Analytics";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "user/",
          element: <Root />,
          children: [
            {
              path: "homePage",
              element: <DashBoard />,
            },
            {
              path: "transaction",
              element: <Transaction />,
            },
            {
              path: "savings",
              element: <Savings />,
            },
            {
              path: "analytics",
              element: <Analytics />
            }
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;