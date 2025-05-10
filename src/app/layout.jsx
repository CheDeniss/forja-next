
import './styles/globals.scss';
import ClientProviders from './ClientProviders';
import {getUserDataFromServer} from "@/lib/server/authMeServer.js";

export default async function RootLayout({ children }) {
    const user = await getUserDataFromServer();

    return (
        <html lang="en">
        <body className="app-container">
        <ClientProviders initialUserData={user}>
            {children}
        </ClientProviders>
        </body>
        </html>
    );
}


