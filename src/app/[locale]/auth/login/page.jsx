'use client';

import React from 'react';
import loginStyles from './LoginPage.module.css';

import Loader from "@/components/ui/Loader/Loader.jsx";
import {useAuth} from "@/context/AuthContext.js";
import Login from "@/components/Auth/Login/Login.jsx";
import {getLocaleFromCookie} from "@/utils/locale.js";
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const isAuthLoading = useAuth().isAuthLoading;
    const router = useRouter();

    const redirect = () => {
        const locale = getLocaleFromCookie();
        const url = `/${locale}/profile`;
        router.push(url);
    };

    return (
        <div className={loginStyles.loginPageContainer}>
            <Loader isLoading={isAuthLoading}/>
            <div className={loginStyles.loginContainer}>
                <Login onSuccess={redirect}/>
            </div>
        </div>
    );
};

export default LoginPage;
