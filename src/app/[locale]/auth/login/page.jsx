'use client';

import React from 'react';
import loginStyles from './LoginPage.module.css';

import Loader from "@/components/ui/Loader/Loader.jsx";
import {useAuth} from "@/context/AuthContext.js";
import Login from "@/components/Auth_components/Login/Login.jsx";

const LoginPage = () => {
    const isAuthLoading = useAuth().isAuthLoading;

    return (
        <div className={loginStyles.loginPageContainer}>
            <Loader isLoading={isAuthLoading}/>
            <div className={loginStyles.loginContainer}>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;
