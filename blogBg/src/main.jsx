import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './components/Login'
import Blog from './components/Blog'
import Add from './components/Add'
import Label from './components/Label'
import Shouji from './components/Shouji'
import Friend from './components/Friend'
import About from './components/About'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import Home from './components/Home'
import { ConfigProvider } from 'antd';
import ErrorPage from './error-page'


const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorPage></ErrorPage>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "admin",
    element: <Login></Login>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "hashboard",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "home",
        element: <Home></Home>
      },
      {
        path: "blog",
        element: <Blog></Blog>
      },
      {
        path: "add",
        element: <Add></Add>
      },
      {
        path: "label",
        element: <Label></Label>
      },
      {
        path: "shouji",
        element: <Shouji></Shouji>
      },
      {
        path: "friend",
        element: <Friend></Friend>
      },
      {
        path: "about",
        element: <About></About>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <ConfigProvider theme={{
    token: {
      colorBgContainer: 'rgba(0,0,0,0)',
      colorTextPlaceholder: 'gray'
    }
  }}>
    <RouterProvider router={router} />
  </ConfigProvider>

)
