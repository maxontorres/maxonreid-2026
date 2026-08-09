import type { Metadata } from "next";
import CVClient from "./CVClient";

type CVPageProps = {
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maxontorres.com";

export async function generateMetadata({ params }: CVPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localePath = `/${locale}/cv`;

  return {
    title: "CV | Maximiliano Brito Torres - Fractional CTO & Technical Advisor",
    description:
      "Curriculum Vitae of Maximiliano Brito Torres, Fractional CTO and Technical Advisor with 8+ years of experience across Next.js, React, Node.js, Laravel, .NET, Django, and AWS.",
    keywords: [
      "Maximiliano Brito Torres CV",
      "Fractional CTO CV",
      "Technical Advisor CV",
      "Next.js developer resume",
      "React Node.js engineer",
      "Software engineer Laos",
    ],
    alternates: {
      canonical: localePath,
      languages: {
        en: "/en/cv",
        lo: "/lo/cv",
        es: "/es/cv",
      },
    },
    openGraph: {
      title: "CV | Maximiliano Brito Torres",
      description:
        "Professional profile and experience of Maximiliano Brito Torres, Fractional CTO and Technical Advisor focused on technical strategy and modern web architecture.",
      url: localePath,
      siteName: "Maxon Torres",
      type: "profile",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Maximiliano Brito Torres CV and Fractional CTO / Technical Advisor profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "CV | Maximiliano Brito Torres",
      description:
        "Curriculum Vitae and professional background of a Fractional CTO and Technical Advisor specializing in Next.js, React, Node.js, Laravel, .NET, and AWS.",
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default async function CVPage({ params }: CVPageProps) {
  const { locale } = await params;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Maximiliano Brito Torres",
        jobTitle: "Fractional CTO / Technical Advisor",
        url: siteUrl,
        image: `${siteUrl}/cv-pic.png`,
        email: "mailto:hello@maxontorres.com",
        telephone: "+8562052373435",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vientiane",
          addressCountry: "Laos",
        },
        sameAs: ["https://www.linkedin.com/in/maxontorres/", "https://github.com/maxonreid"],
        knowsAbout: [
          "Next.js",
          "React",
          "Node.js",
          "Laravel",
          ".NET",
          "Django",
          "AWS Serverless",
          "TypeScript",
          "Technical Strategy",
          "Software Architecture",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/${locale}/cv#webpage`,
        url: `${siteUrl}/${locale}/cv`,
        name: "Curriculum Vitae | Maximiliano Brito Torres",
        description:
          "Curriculum Vitae of Maximiliano Brito Torres, Fractional CTO and Technical Advisor with international experience in technical strategy, web architecture, and cloud applications.",
        inLanguage: locale,
        about: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CVClient />
    </>
  );
}
