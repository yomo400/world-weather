import { DataProvider } from "./component/DataContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "World Weather",
  description: "世界中の都市の天気が見れる！",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`bg-gray-100 ${inter.className}`}>
        <DataProvider>
          <main className="min-h-screen max-w-screen-lg mx-auto">
            {children}
          </main>
        </DataProvider>
      </body>
    </html>
  );
}
