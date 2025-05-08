import React from 'react';
import Login from "@/components/Auth_components/Login/Login.jsx";
import styles from './LoginModal.module.scss';
import {useAuth} from "@/context/AuthContext.js";
import Loader from "@/components/ui/Loader/Loader.jsx";

const LoginModal = ({ redirectUrl, onSuccess }) => {
    const isAuthLoading = useAuth().isAuthLoading;

    return (
        <div className={styles.wrapper}>
            <Loader isLoading={isAuthLoading}/>
            <Login redirectUrl={redirectUrl} onSuccess={onSuccess}/>
        </div>
    );
};

export default LoginModal;
