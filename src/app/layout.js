import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The New Wave – Not Your Mom's Christian Music Movement",
  description:
    "The New Wave is your home for faith-fueled music and meaningful creativity—highlighting bold artists, fresh drops, and deep dives into what God is doing in sound.",
  metadataBase: new URL("https://newwavechristian.org"),
  openGraph: {
    title: "The New Wave – Christian Music for the Bold",
    description:
      "Faith-fueled music, bold creativity. Articles, podcasts, playlists, and more.",
    url: "https://newwavechristian.org",
    siteName: "The New Wave",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The New Wave cover image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The New Wave",
    description: "Faith-fueled music and meaningful creativity.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2J5PW3JFHH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2J5PW3JFHH');
          `}
        </Script>
        <Script id="meta-icons" strategy="beforeInteractive">
          {`
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
