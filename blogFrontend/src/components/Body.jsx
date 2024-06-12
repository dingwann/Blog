import { useLayoutEffect } from 'react'
import GridOne from './GridOne'
import GridTwo from './GridTwo'
import Login from "../components/Login";
import { ToastContainer } from 'react-toastify';

export default function Body(props) {
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })

    }, [])

    return (
        <>
            <div className='relative w-auto h-[100%] mt-[13.5vh] mx-[24px] max-[1023px]:mb-[16px] max-lg:space-y-6 md:mx-24 md:mt-[12vh] min-[1024px]:mx-[56px] min-[1025px]:mx-[130px] min-[1024px]:mt-[17.33vh] mb-[118px] grid grid-cols-1 lg:grid-cols-8 gap-3'>
                <GridOne></GridOne>

                <GridTwo></GridTwo>
                {/* 鼠标 */}
                {/* <div className='grid place-content-center absolute bottom-8 md:bottom-12 inset-x-0'>
                    <div className='w-[20px] h-[30px] md:w-[26px] md:h-[38px] rounded-full border-2 border-primary/30 relative grid justify-center pt-2'>
                        <div className='w-[2px] h-[5px] md:h-[7px] bg-primary/30  rounded-full animate-intro-scroll'></div>
                    </div>
                </div> */}

                <Login></Login>
                <ToastContainer />
            </div>
        </>
    )
};