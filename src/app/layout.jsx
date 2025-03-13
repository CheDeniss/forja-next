
import "./styles/globals.css";
import Navbar from "./components/Navigation/Navigation";
import FooterWrapper from "./components/Footer/FooterWrapper";
import { AuthProvider } from "../context/authContext";


export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className="app-container">
            <AuthProvider>
              <Navbar />
                  <main className="main">
                    {children}
                  </main>
              <FooterWrapper />
            </AuthProvider>
          </body>
      </html>
  );
}