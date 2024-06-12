import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../src/assets/css/body.scss'
import './assets/css/toastify.scss'
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from './error-page.jsx'
import Body from './components/Body.jsx'
import Blog from './components/Blog';
import Share from './components/Share';
import Friend from './components/Friend.jsx';
import About from './components/About';
import Article from './components/Article.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:aid",
        element: <Article />,
      },
      {
        path: "share",
        element: <Share />,
      },
      {
        path: "friend",
        element: <Friend />,
      },
      {
        path: "about",
        element: <About />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(

  <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="light">
      <RouterProvider router={router} />
    </NextThemesProvider>
  </NextUIProvider>

)
