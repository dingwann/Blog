import { useLayoutEffect } from "react";
import Login from "../components/Login";

export default function Share(props) {
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })

    }, [])

    return (
        <>
            <div className="px-4 w-full relative">
                <Login></Login>
                <div className="pt-4 text-center flex flex-col items-center px-[8px] md:px-[56px] lg:pt-5 md:pt-6 sm:pt-6 xl:pt-16">
                    <div className="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]">

                        <div className="text-left flex flex-col">
                            <h1 className="text-5xl text-violet-400 font-bold">
                                Share
                            </h1>
                            <div className="py-4">
                                <span>
                                    Short articles , usually some Application tutorials and Interesting stuff .
                                </span>
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="z-2">
                                Coding...
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
