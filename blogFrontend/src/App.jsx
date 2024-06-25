import Navbar_DW from "./components/Navbar_DW";
import Footer from "./components/Footer";
import './components/Login'
import { LoginProvider } from './components/LoginContext'
import AsideContextWrapper from './components/AsideContext'
import { useEffect, useRef, useState, useContext, useLayoutEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet, BrowserRouter as Router, useLocation } from "react-router-dom";
import { LoginContext } from './components/LoginContext'
import http from './components/Axiosconfig'
import { Helmet } from 'react-helmet';


// 组件用于统计PV和UV
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPage = () => {
      if (!location.pathname.startsWith('/api')) {
        http.post('/api/track', { url: location.pathname })
          .catch(error => {
            console.error('There was an error tracking the page view!', error);
          });
      }
    };

    trackPage();
  }, [location]);
};

function App() {

  const [show, setShow] = useState()

  // 存储PV、UV
  const [stats, setStats] = useState()

  useLayoutEffect(() => {
    async function fetchData() {
      // 请求PV、UV
      const res = await http.get('/api/stats')
      setStats(res.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    window.onscroll = function () {
      const height = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(height);
      if (height !== 0) {
        setShow(true)
      } else setShow(false)
    }
    return () => {
      window.onscroll = null
    }
  })

  function getTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  return (
    <>
      <Helmet>
        <title> Ding Wan </title>
      </Helmet>
      <div className="w-full h-full relative">
        <LoginProvider>
          <AsideContextWrapper>
            <Navbar_DW />
          </AsideContextWrapper>
          <Outlet />
          <Footer stats={stats} />
          <button onClick={getTop} className={`${show ? "transition animate-[fade-up_0.3s] delay-100  hover:-translate-y-1 hover:scale-110 lg:hover:bg-violet-200 duration-250 inline-flex items-center justify-center whitespace-nowrap rounded-[14px] text-md font-medium ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 w-10 fixed bottom-8 right-8" : "hover:bg-gray-100 duration-300 ease-in-out items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 w-10 fixed bottom-8 right-8 hidden"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
          </button>
        </LoginProvider>
      </div>
    </>
  );
}

function Root() {
  usePageTracking(); // 在顶层组件中使用页面跟踪
  return <App />;
}

export default Root;