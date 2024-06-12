import { useState, useContext, createContext } from "react"

export const asideNavShow = createContext();

export default function AsideContextWrapper(props) {
    const [isAsideOpen, setIsAsideOpen] = useState(false);

    return (
        <>
            <asideNavShow.Provider value={{ isAsideOpen, setIsAsideOpen }}>{props.children}</asideNavShow.Provider>
        </>
    )
};
