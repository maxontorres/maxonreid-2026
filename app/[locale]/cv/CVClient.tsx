"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function CVClient() {
  return (
    <>
      <style jsx global>{`
        :root {
          --cv-accent: #1e3a8a;
          --cv-text: #111827;
          --cv-muted: #4b5563;
          --cv-border: #d1d5db;
        }

        .cv-paper {
          color: var(--cv-text);
          line-height: 1.55;
          letter-spacing: 0.01em;
        }

        .cv-section-title {
          color: var(--cv-accent);
          font-size: 0.95rem;
          letter-spacing: 0.08em;
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .no-print {
            display: none !important;
          }

          .cv-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }

          a {
            color: inherit !important;
            text-decoration: none !important;
          }

          .print-compact {
            margin-top: 0.5rem !important;
            margin-bottom: 0.5rem !important;
          }

          .cv-paper {
            font-size: 12pt;
            line-height: 1.45;
          }

          .cv-section-title {
            font-size: 11pt;
          }

          .cv-paper .text-sm,
          .cv-paper .text-\[0\.96rem\],
          .cv-paper .text-\[0\.98rem\] {
            font-size: 11pt !important;
          }

          .cv-paper .text-base {
            font-size: 12pt !important;
          }

          .cv-paper .text-3xl {
            font-size: 21pt !important;
            line-height: 1.2;
          }
        }
      `}</style>

      <div className="no-print">
        <Header />
      </div>

      <main className="min-h-screen bg-slate-100 py-8 print:py-0" aria-label="Curriculum Vitae page">
        <article className="cv-container cv-paper max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm print:shadow-none p-8 print:p-0">
          <div className="no-print mb-6 flex justify-end">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-700 transition-colors"
              aria-label="Download curriculum vitae as PDF"
            >
              Download PDF
            </button>
          </div>

          <header className="border-b border-gray-300 pb-5 mb-6">
            <div className="flex gap-6 items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">MAXIMILIANO BRITO TORRES</h1>
                <p className="text-base font-medium text-gray-700 mb-3">Software Developer & Consultant | Building and Managing Software Projects — Next.js, React, Node.js</p>
                <address className="not-italic grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span>Vientiane, Laos (GMT+7)</span>
                  <span>+856 20 52 373 435</span>
                  <a href="mailto:hello@maxontorres.com" className="hover:text-slate-900">
                    hello@MaxonTorres.com
                  </a>
                  <a href="https://maxontorres.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
                    MaxonTorres.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/maxontorres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Maximiliano Brito Torres on LinkedIn (opens in new tab)"
                    className="sm:col-span-2 hover:text-slate-900"
                  >
                    linkedin.com/in/maxontorres
                  </a>
                </address>
              </div>

              <div className="flex-shrink-0">
                <Image
                  src="/cv-pic.png"
                  alt="Portrait of Maximiliano Brito Torres"
                  width={112}
                  height={144}
                  priority
                  className="w-28 h-36 object-cover border border-gray-300 rounded-sm"
                />
              </div>
            </div>
          </header>

          <section className="mb-6 print-compact" aria-labelledby="professional-summary">
            <h2 id="professional-summary" className="cv-section-title font-semibold uppercase border-b border-gray-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-[0.98rem] leading-relaxed">
              Software Developer & Consultant with 8+ years of experience in Mexico, Thailand, China, and Laos, building websites, web apps, and
              internal tools with Next.js, React, Node.js, PHP Laravel, .NET, Python Django, and AWS. I've helped traditional businesses move online with
              software that actually works, managed the projects behind it, and taught the next generation of developers (Yango University, China and ComCenter College, Laos).
            </p>
          </section>

          <section className="mb-6 print-compact" aria-labelledby="technical-expertise">
            <h2 id="technical-expertise" className="cv-section-title font-semibold uppercase border-b border-gray-300 pb-1 mb-2">
              Technical Expertise
            </h2>
            <div className="space-y-1.5 text-gray-700 text-[0.96rem]">
              <p><strong className="text-gray-900">Languages:</strong> JavaScript (ES6+), TypeScript, PHP, C#, SQL, HTML5/CSS3.</p>
              <p><strong className="text-gray-900">Frontend:</strong> Next.js (App Router), React, Vue.js, Angular, Tailwind CSS.</p>
              <p><strong className="text-gray-900">Backend and API:</strong> Node.js, Express, GraphQL, Laravel, .NET / ASP.NET Core, Django, RESTful API Design.</p>
              <p><strong className="text-gray-900">Cloud and DevOps:</strong> AWS (Lambda, API Gateway, DynamoDB, S3, Rekognition), Docker.</p>
              <p><strong className="text-gray-900">Specialized:</strong> AI Integration (AWS Rekognition), Technical Education.</p>
            </div>
          </section>

          <section className="mb-6 print-compact" aria-labelledby="professional-experience">
            <h2 id="professional-experience" className="cv-section-title font-semibold uppercase border-b border-gray-300 pb-1 mb-3">
              Professional Experience
            </h2>

            <div className="mb-5">
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">Technical Project Manager | Software Delivery & Architecture</h3>
                <span className="text-sm text-gray-600">Oct 2025 - Present</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">Vientiane, Laos</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[0.96rem]">
                <li>Leading end-to-end delivery of software projects, aligning technical strategy with business goals across cross-functional teams.</li>
                <li>Directing architecture and technology decisions for web applications and internal systems, drawing on hands-on experience with Next.js, Laravel, .NET, and Django.</li>
                <li>Overseeing vendor and developer teams to ensure delivery quality, timelines, and long-term maintainability.</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">ComCenter College | IT Lecturer (Web and UI/UX)</h3>
                <span className="text-sm text-gray-600">Jan 2024 - Oct 2025</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">Vientiane, Laos</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[0.96rem]">
                <li>Designed and delivered advanced curricula for Full Stack Development, bridging the gap between academic theory and 2026 industry standards.</li>
                <li>Standardized internal web architecture practices (DNS, server management) for the institution's digital infrastructure.</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">Yango University | IT Lecturer (Web and UI/UX)</h3>
                <span className="text-sm text-gray-600">Aug 2023 - Jan 2024</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">Fuzhou, China</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[0.96rem]">
                <li>Developed project-based learning modules for Responsive Web Design and SEO, resulting in a 30% increase in student portfolio placement.</li>
                <li>Mentored 100+ students in modern UI/UX principles, emphasizing user-centric design in the Chinese tech ecosystem.</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">TISCO Financial Group | Full Stack Developer (Cloud Focus)</h3>
                <span className="text-sm text-gray-600">Oct 2019 - Jan 2021</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">Bangkok, Thailand</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[0.96rem]">
                <li>Developed a high-security AI application utilizing AWS Rekognition for automated image analysis in financial processing.</li>
                <li>Built and managed serverless architecture (Lambda, API Gateway, DynamoDB) to ensure 99.9% uptime for critical financial tools.</li>
                <li>Collaborated on cross-functional Fintech squads to deploy secure, React-based dashboards for banking clients.</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">Infinity IT Success / AD System Asia | Full Stack Developer</h3>
                <span className="text-sm text-gray-600">Feb 2018 - Oct 2019</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">Bangkok, Thailand</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[0.96rem]">
                <li>Engineered RESTful APIs and dynamic frontends using Angular, React, and Laravel for regional clients.</li>
                <li>Optimized legacy PHP systems, improving server-side processing speeds by 25%.</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">Anevi | Full Stack Developer</h3>
                <span className="text-sm text-gray-600">Aug 2015 - Dec 2017</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">Mexico City, Mexico</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-[0.96rem]">
                <li>Initiated full-lifecycle development of web apps using the PHP/JavaScript/AJAX stack for the Mexican market.</li>
              </ul>
            </div>
          </section>

          <section className="mb-6 print-compact" aria-labelledby="education-certifications">
            <h2 id="education-certifications" className="cv-section-title font-semibold uppercase border-b border-gray-300 pb-1 mb-2">
              Education and Certifications
            </h2>
            <ul className="space-y-1.5 text-gray-700 text-[0.96rem]">
              <li><strong>Bachelor's Degree in Computer Systems Engineering</strong> | Universidad Tecmilenio, Mexico</li>
              <li><strong>Security 5 V1</strong> | Certified Network Security Professional</li>
            </ul>
          </section>

          <section className="print-compact" aria-labelledby="languages">
            <h2 id="languages" className="cv-section-title font-semibold uppercase border-b border-gray-300 pb-1 mb-2">
              Languages
            </h2>
            <div className="text-gray-700 text-[0.96rem]">
              <p><strong>Spanish:</strong> Native</p>
              <p><strong>English:</strong> Full Professional Proficiency</p>
            </div>
          </section>
        </article>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
