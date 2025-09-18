// frontend/src/app/api/youtube/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';        // нужен доступ к process.env
export const dynamic = 'force-dynamic'; // без build-кэша

const KEY = process.env.YOUTUBE_API_KEY;

export async function GET(req: NextRequest) {
  if (!KEY) {
    return NextResponse.json({ error: 'Server YOUTUBE_API_KEY missing' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get('channelId') ?? '';
  const order     = searchParams.get('order') ?? 'date';
  const max       = Math.min(Math.max(Number(searchParams.get('maxResults') ?? '10'), 1), 50);
  const pageToken = searchParams.get('pageToken') ?? '';

  if (!channelId) {
    return NextResponse.json({ error: 'channelId required' }, { status: 400 });
  }

  const params = new URLSearchParams({
    key: KEY,
    channelId,
    part: 'snippet,id',
    order,
    maxResults: String(max),
  });
  if (pageToken) params.set('pageToken', pageToken);

  const ytUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
  const r = await fetch(ytUrl, { cache: 'no-store' });
  const data = await r.json();

  if (!r.ok) {
    console.error('YouTube API error', r.status, data);
    return NextResponse.json({ error: 'YouTube API error', details: data }, { status: r.status });
  }

  const items = (data.items ?? [])
    .map((item: any) => ({
      videoId: item?.id?.videoId,
      title: item?.snippet?.title,
    }))
    .filter((v: any) => !!v.videoId);

  return NextResponse.json({ items, nextPageToken: data.nextPageToken ?? null }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
