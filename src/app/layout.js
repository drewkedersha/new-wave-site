import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GAListener from "./ga-listener";
import GAEvents from "./ga-events";


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
  // ✅ Register all icons here (cache-busted with ?v=10)
  icons: {
    icon: [
      { url: "/favicon-16x16.png?v=10", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=10", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=10" }, // multi-size .ico
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=10", sizes: "180x180", type: "image/png" },
    ],
  },
  // Optional but nice: link your web app manifest
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.newwavechristian.org",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* GA4 loader via env var */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* If you added these earlier, keep them */}
        <GAListener />
        <GAEvents />
        {children}
      </body>
    </html>
  );
}