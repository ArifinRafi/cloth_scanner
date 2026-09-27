import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const recipient = 'arifin@advanced-ai-lab.com';

function field(value: unknown, limit: number) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]!);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 15_000) {
    return NextResponse.json({ message: 'The submission is too large.' }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid form submission.' }, { status: 400 });
  }

  // Quietly accept bot submissions caught by the hidden field.
  if (field(payload.website, 100)) return NextResponse.json({ ok: true });

  const name = field(payload.name, 100);
  const phone = field(payload.phone, 40);
  const address = field(payload.address, 300);
  const query = field(payload.query, 3000);

  if (!name || !phone || !address || !query) {
    return NextResponse.json({ message: 'Please complete every field.' }, { status: 400 });
  }
  if (!/^[+\d][\d\s().-]{6,39}$/.test(phone)) {
    return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ message: 'Email delivery is not configured yet. Please email us directly.' }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeAddress = escapeHtml(address).replace(/\n/g, '<br />');
  const safeQuery = escapeHtml(query).replace(/\n/g, '<br />');
  const submittedAt = new Date().toISOString();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: `Cloth Scanner inquiry from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `New Cloth Scanner inquiry\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nQuery:\n${query}\n\nSubmitted: ${submittedAt}`,
      html: `<div style="font-family:Arial,sans-serif;color:#14201e;line-height:1.55;max-width:640px"><p style="color:#007977;font-weight:700;letter-spacing:.08em">CLOTH SCANNER INQUIRY</p><h1 style="font-size:28px;margin:0 0 24px">New website inquiry</h1><table style="border-collapse:collapse;width:100%;margin-bottom:24px"><tr><td style="padding:10px;border-bottom:1px solid #dde4e2;color:#60706c">Name</td><td style="padding:10px;border-bottom:1px solid #dde4e2;font-weight:700">${safeName}</td></tr><tr><td style="padding:10px;border-bottom:1px solid #dde4e2;color:#60706c">Phone</td><td style="padding:10px;border-bottom:1px solid #dde4e2;font-weight:700">${safePhone}</td></tr><tr><td style="padding:10px;border-bottom:1px solid #dde4e2;color:#60706c">Address</td><td style="padding:10px;border-bottom:1px solid #dde4e2">${safeAddress}</td></tr></table><h2 style="font-size:18px">Query</h2><p style="background:#f3f6f5;border-left:4px solid #008784;padding:18px">${safeQuery}</p><p style="font-size:12px;color:#7c8986">Submitted ${submittedAt}</p></div>`,
    }),
  });

  if (!response.ok) {
    console.error('Contact email delivery failed:', response.status, await response.text());
    return NextResponse.json({ message: 'The message could not be sent. Please try again or email us directly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
