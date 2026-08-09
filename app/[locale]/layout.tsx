import type { Metadata } from "next";
import { Michroma, Manrope, Space_Mono, Noto_Sans_Lao } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import MetaPixel from '@/app/components/MetaPixel';
import { getMessages } from 'next-intl/server';
import "@/app/globals.css";
import WhatsAppWidget from '@/app/components/WhatsAppWidget';
import ParticleBackground from '@/app/components/ParticleBackground';

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
      "Maximiliano Brito Torres | Software Developer & Consultant in Vientiane",
    template: "%s | Maxon Torres",
  },
  description:
    "I build and take care of software for businesses — websites, internal tools, and automations that keep working, plus managing the projects behind them. Based in Vientiane, Laos, hands-on with Next.js, React, Node.js, Laravel, .NET, Django, and AWS. Available for remote work worldwide and local projects in Vientiane.",
  keywords: [
    "Software Developer",
    "Software Consultant",
    "Software Project Manager",
    "Software Developer Vientiane",
    "Software Developer Laos",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    ".NET Developer",
    "Laravel Developer",
    "Django Developer",
    "AWS Serverless Developer",
    "Full Stack Developer Laos",
    "Software Maintenance",
  ],
  openGraph: {
    title:
      "Maximiliano Brito Torres | Software Developer & Consultant in Vientiane",
    description:
      "I build and take care of software for businesses in Vientiane, Laos — websites, internal tools, and automations, plus managing the projects behind them. Hands-on build experience across Next.js, React, Node.js, Laravel, .NET, Django, and AWS.",
    url: "https://maxontorres.com",
    siteName: "Maxon Torres",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maximiliano Brito Torres - Software Developer & Consultant in Vientiane",
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
        <ParticleBackground />
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
