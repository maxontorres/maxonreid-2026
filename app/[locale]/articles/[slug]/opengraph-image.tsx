import { ImageResponse } from 'next/og';
import { articles } from '@/app/lib/articles';

export const runtime = 'edge';
export const alt = 'Article OG Image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && a.published);

  const logoUrl = new URL('/logo-maxontorres.png', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString();
  const articleImageUrl = article?.image ? new URL(article.image, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString() : null;

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: '#050608',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#628DFF',
            fontWeight: 'bold',
          }}
        >
          Article Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#050608',
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: '650px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <img
                src={logoUrl}
                alt="Logo"
                width="80"
                height="80"
              />
              <div
                style={{
                  fontSize: 28,
                  color: '#628DFF',
                  fontWeight: '600',
                  display: 'flex',
                }}
              >
                Maxon Torres
              </div>
            </div>
            
            <h1
              style={{
                fontSize: 52,
                fontWeight: 'bold',
                color: '#E8E9EC',
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {article.title}
            </h1>
            
            <p
              style={{
                fontSize: 22,
                color: '#8A8FA0',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {article.excerpt}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              // borderTop: '2px solid rgba(98, 141, 255, 0.2)',
              paddingTop: '24px',
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: '#8A8FA0',
                display: 'flex',
              }}
            >
              {article.date}
            </div>
          </div>
        </div>

        {articleImageUrl && (
          <img
            src={articleImageUrl}
            alt="Article"
            width="400"
            height="510"
            style={{
              position: 'absolute',
              right: '60px',
              top: '60px',
              borderRadius: '12px',
              // border: '2px solid rgba(98, 141, 255, 0.15)',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    ),
    { ...size }
  );
}
