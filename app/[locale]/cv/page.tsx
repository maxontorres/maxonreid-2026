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
    title: "CV | Maximiliano Brito Torres - Software Developer & Consultant",
    description:
      "Curriculum Vitae of Maximiliano Brito Torres, Software Developer & Consultant with 8+ years of experience across Next.js, React, Node.js, Laravel, .NET, Django, and AWS.",
    keywords: [
      "Maximiliano Brito Torres CV",
      "Software Developer CV",
      "Software Consultant CV",
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
        "Professional profile and experience of Maximiliano Brito Torres, a Software Developer & Consultant who builds and manages software projects.",
      url: localePath,
      siteName: "Maxon Torres",
      type: "profile",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Maximiliano Brito Torres CV and Software Developer & Consultant profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "CV | Maximiliano Brito Torres",
      description:
        "Curriculum Vitae and professional background of a Software Developer & Consultant working across Next.js, React, Node.js, Laravel, .NET, and AWS.",
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
        jobTitle: "Software Developer & Consultant",
        url: siteUrl,
        image: `${siteUrl}/cv-pic.png`,
        email: "mailto:hello@maxontorres.com",
        telephone: "+8562052373435",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vientiane",
          addressCountry: "Laos",
        },
        sameAs: ["https://www.linkedin.com/in/maxontorres/", "https://github.com/maxontorres"],
        knowsAbout: [
          "Next.js",
          "React",
          "Node.js",
          "Laravel",
          ".NET",
          "Django",
          "AWS Serverless",
          "TypeScript",
          "Software Development",
          "Project Management",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/${locale}/cv#webpage`,
        url: `${siteUrl}/${locale}/cv`,
        name: "Curriculum Vitae | Maximiliano Brito Torres",
        description:
          "Curriculum Vitae of Maximiliano Brito Torres, Software Developer & Consultant with international experience building web applications and managing software projects.",
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
