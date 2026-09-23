import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pastorsprovision.com"),
  title: {
    default: "Pastor's Provision — Church Supply & Restock Portal",
    template: "%s | Pastor's Provision",
  },
  description:
    "Streamline your church purchasing with curated monthly restock checklists and high-demand supplies for Hospitality, Communion, KidMin, Facilities, Office, and Celebrate Recovery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pastor's Provision — Church Supply & Restock Portal",
    description:
      "Streamline your church purchasing with curated monthly restock checklists and high-demand supplies for Hospitality, Communion, KidMin, Facilities, Office, and Celebrate Recovery.",
    url: "https://pastorsprovision.com",
    siteName: "Pastor's Provision",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Pastor's Provision Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pastor's Provision — Church Supply & Restock Portal",
    description:
      "Curated monthly restock checklists and high-demand supplies for church departments.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-KTK6064MYZ";


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

