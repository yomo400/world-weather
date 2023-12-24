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
        <main className="min-h-screen max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
