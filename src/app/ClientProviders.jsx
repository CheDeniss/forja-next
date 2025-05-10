'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ModalProvider } from '@/context/ModalContext';
import {useEffect} from "react";
import AuthRefreshClient from "@/components/Auth_components/AuthRefreshClient.jsx";

export default function ClientProviders({ children, initialUserData }) {

        useEffect(() => {
            console.log('[TEST] useEffect у ClientProviders спрацював');
        }, []);

    return (
        <AuthProvider initialUserData={initialUserData}>
            <ModalProvider>
                {children}
                <AuthRefreshClient />
            </ModalProvider>
        </AuthProvider>
    );
}
