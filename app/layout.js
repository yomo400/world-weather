import { CityProvider } from "./component/CityContext";
import { MessageProvider } from "./component/MessageContext";
import "./globals.css";
import { IBM_Plex_Sans_JP } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
const IBM = IBM_Plex_Sans_JP({
  preload: false,
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "World Weather",
  description: "世界中の都市の天気が見れる！",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`bg-gray-100 ${IBM.className}`}>
        <CityProvider>
          <MessageProvider>
            <main className="min-h-screen max-w-screen-lg mx-auto">
              {children}
              <p className="pl-4 ml-2 text-sm text-teal-500 mb-4">
                icons by&nbsp;
                <a
                  target="_blank"
                  href="https://icons8.com"
                  className="underline decoration-1 underline-offset-4"
                >
                  Icons8
                </a>
              </p>
            </main>
          </MessageProvider>
        </CityProvider>
      </body>
    </html>
  );
}
