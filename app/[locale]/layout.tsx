import type { Metadata } from "next";
import { Michroma, Manrope, Space_Mono, Noto_Sans_Lao } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import MetaPixel from '@/app/components/MetaPixel';
import { getMessages } from 'next-intl/server';
import "@/app/globals.css";
import WhatsAppWidget from '@/app/components/WhatsAppWidget';

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansLao = Noto_Sans_Lao({
  variable: "--font-noto-sans-lao",
  subsets: ["lao"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com'),
  title: {
    default:
      "Maximiliano Brito Torres | Freelance Software Developer in Vientiane",
    template: "%s | Maxon Torres",
  },
  description:
    "Freelance Software Developer in Vientiane, Laos specializing in Next.js, React, Node.js, GraphQL, and AWS Serverless architecture. Building scalable, high-performance web applications for global companies. Available for remote work and local projects in Vientiane.",
  keywords: [
    "Freelance Software Developer in Vientiane",
    "Freelance Developer Vientiane",
    "Software Developer Vientiane",
    "Web Developer Vientiane",
    "Freelance Web Developer Vientiane Laos",
    "Senior Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "GraphQL Developer",
    "AWS Serverless Developer",
    "Remote Software Engineer",
    "JavaScript Engineer",
    "Full Stack Developer Laos",
    "Software Engineer Vientiane",
    "Freelance Programmer Vientiane",
  ],
  openGraph: {
    title:
      "Maximiliano Brito Torres | Freelance Software Developer in Vientiane",
    description:
      "Freelance Software Developer in Vientiane, Laos. Building scalable web applications with Next.js, React, Node.js and AWS. Available for remote opportunities worldwide and local projects in Vientiane.",
    url: "https://maxontorres.com",
    siteName: "Maxon Torres",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maximiliano Brito Torres - Freelance Software Developer in Vientiane",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="dark" className={locale === 'lo' ? 'locale-lao' : 'locale-en'}>
      <head>
        <meta name="theme-color" content="#050608" id="meta-theme-color" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Maxon Torres — Articles"
          href="/rss.xml"
        />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="8e2ec7e3-5bce-4088-b18c-966a6ba4f468"></script>
      </head>
      <body
        className={`${michroma.variable} ${manrope.variable} ${spaceMono.variable} ${notoSansLao.variable} antialiased min-h-screen overflow-x-hidden`}
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <MetaPixel />
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
