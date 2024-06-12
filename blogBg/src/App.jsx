import { useState } from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function App(props) {


    return (
        <>
            <div className='flex space-x-2 h-screen'>
                <div className="flex-none w-64">
                    <Nav />
                </div>
                <div className="flex-1 overflow-x-hidden">
                    <ToastContainer></ToastContainer>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default App