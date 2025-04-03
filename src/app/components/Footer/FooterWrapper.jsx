"use client";

import React from 'react';
import {usePathname} from "next/navigation";
import Footer from "./Footer";

const FooterWrapper = () => {
    const pathName = usePathname();
    console.log(pathName);
    if (pathName.includes('/login') ||
        pathName.includes('/register') ||
        pathName.includes('/verify-email') ||
        pathName.includes('/reset-password') ||
        pathName.includes('/forgot-password')
    ){
        return null;
    }
        return <Footer/>;
};

export default FooterWrapper;
