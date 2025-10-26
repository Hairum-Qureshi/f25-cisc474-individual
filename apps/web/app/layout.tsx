import Footer from '../components/Footer';
import Navbar from '../components/navbar/Navbar';
import SideNavbar from '../components/navbar/SideNavbar';
import './globals.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="sm:block">
          <Navbar />
        </header>
        <main className="flex w-full flex-grow">
          <div className="w-1/4 bg-sky-950 hidden lg:block">
            <SideNavbar />
          </div>
          <div className="lg:w-4/5 w-full lg:m-0 m-3">{children}</div>
        </main>
        {/* <footer className="w-full p-2 bg-black">
          <Footer />
        </footer> */}
      </body>
    </html>
  );
}
