import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#173f31',
          color: '#fff7ed',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <span>Best of Pigeon Forge</span>
          <span style={{ color: '#fbbf24' }}>Smoky Mountains</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: -2,
              maxWidth: 950,
            }}
          >
            Plan a better Pigeon Forge trip
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.25,
              color: '#d9f99d',
              maxWidth: 860,
            }}
          >
            Curated attractions, itineraries, comparisons, and local planning tools.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 28,
            color: '#fed7aa',
          }}
        >
          <span>Activities</span>
          <span style={{ color: '#fbbf24' }}>•</span>
          <span>Itineraries</span>
          <span style={{ color: '#fbbf24' }}>•</span>
          <span>Trip comparisons</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
