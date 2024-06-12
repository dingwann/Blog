import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import MenuSwitch from "./MenuSwitch";
import { asideNavShow } from '../components/AsideContext'
import { Link } from "react-router-dom";



const items = [
    { key: 'home', label: '首页', to: '/' },
    { key: 'blog', label: '博客', to: 'blog' },
    { key: 'share', label: '手记', to: 'share' },
    { key: 'message', label: '友链', to: 'friend' },
    { key: 'about', label: '关于我', to: 'about' },
];

export default function AsideMenu() {
    const [show, setShow] = useState(false)

    return (
        <Dropdown backdrop="blur" key={show}>
            <DropdownTrigger>
                <span variant="bordered" children={<MenuSwitch></MenuSwitch>}>
                </span>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions" items={items} className="space-y-6"
                children={(item) => (
                    <DropdownItem key={item.key} textValue={item.label} onClick={() => { setShow(!show) }}>
                        <Link className="text-lg font-semibold" to={item.to}>{item.label}</Link>
                    </DropdownItem>
                )}
            >
            </DropdownMenu>
        </Dropdown>
    );
}
