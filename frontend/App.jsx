import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import DashBoard from './components/DashBoard/DashBoard'
import Transaction from './components/Transaction/Transaction'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
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
              element: <Transaction />
            }

          ]
          
        },
      ]}
    ])
  return <RouterProvider router={router} />
}

export default App
