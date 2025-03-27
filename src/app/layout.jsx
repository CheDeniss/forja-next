
import "./styles/globals.css";
import FooterWrapper from "./components/Footer/FooterWrapper";
import { AuthProvider } from "../context/authContext";
import NavbarWrapper from "./components/Navigation/NavbarWrapper";


export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className="app-container">
            <AuthProvider>
              <NavbarWrapper />
                  <main className="main">
                    {children}
                  </main>
              <FooterWrapper />
            </AuthProvider>
          </body>
      </html>
  );
}