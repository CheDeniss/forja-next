import './styles/globals.css';

export default function RootLayout({ children }) {
    return (
        <html>
            <body className="app-container">{children}</body>
        </html>
    );
}
