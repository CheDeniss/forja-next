"use client";

import React from 'react';
import {usePathname} from "next/navigation";
import Navigation from "./Navigation.jsx";

const NavbarWrapper = () => {
    const pathName = usePathname();
    console.log(pathName);
    if (pathName.includes('/verify-email')){
        return null;
    }
    return <Navigation/>;
};

export default NavbarWrapper;
