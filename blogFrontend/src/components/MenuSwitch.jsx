import { useState, useContext } from "react"
import { asideNavShow } from '../components/AsideContext'

export default function MenuSwitch(props) {
    const ctx = useContext(asideNavShow)

    function openChange() {
        ctx.setIsAsideOpen(!ctx.isAsideOpen)
    }


    return (
        <>
            <div className="cursor-pointer">
                <span className={`${ctx.isAsideOpen ? "hidden" : "visible"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" /></svg>
                </span>
                <span className={`${ctx.isAsideOpen ? "visible" : "hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
                    </svg>
                </span>
            </div>
        </>
    )
};
