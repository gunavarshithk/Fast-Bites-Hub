import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";
import {AppProvider} from "@/components/AppContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Fast Bites Hub",
  description:
    "Developed By Krishna Sai Raj,Lasya Priya,Guna Varshith,Jaya Sree,Susritha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
          <Header />
          {children}
          <footer className="border-t p-2 text-center text-gray-500 mt-8">
            &copy; 2024 All rights Reserved
          </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
