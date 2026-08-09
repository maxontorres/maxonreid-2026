import type { Metadata } from "next";
import { Big_Shoulders, Space_Mono, Lora, Noto_Sans_Lao } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import MetaPixel from '@/app/components/MetaPixel';
import { getMessages } from 'next-intl/server';
import "@/app/globals.css";
import "xterm/css/xterm.css";
import WhatsAppWidget from '@/app/components/WhatsAppWidget';

const bigShouldersDisplay = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500"],
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
        <meta name="theme-color" content="#080808" id="meta-theme-color" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Maxon Torres — Articles"
          href="/rss.xml"
        />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="8e2ec7e3-5bce-4088-b18c-966a6ba4f468"></script>
      </head>
      <body
        className={`${bigShouldersDisplay.variable} ${spaceMono.variable} ${lora.variable} ${notoSansLao.variable} antialiased min-h-screen overflow-x-hidden`}
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        <MetaPixel />
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
