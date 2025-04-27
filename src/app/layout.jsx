import './styles/globals.scss';
import { ModalProvider } from '@/context/ModalContext';
import {AuthProvider} from "@/context/AuthContext.js";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="app-container">
                <AuthProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
