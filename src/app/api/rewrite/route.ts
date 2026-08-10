import { NextResponse } from 'next/server';
import { z } from 'zod';
import { GeminiAIServiceAdapter } from '@/lib/ai/service';

const RewriteRequestSchema = z.object({
  content: z.string().min(1),
  action: z.enum(['shorten', 'expand', 'simplify', 'child_friendly', 'formal', 'translate']),
  targetLang: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, action, targetLang } = RewriteRequestSchema.parse(body);

    const aiService = new GeminiAIServiceAdapter();
    const rewrittenText = await aiService.rewriteText(content, action, targetLang);

    return NextResponse.json({
      success: true,
      data: { rewrittenText },
    });
  } catch (error: any) {
    console.error('API Error in /api/rewrite:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Terjadi kesalahan saat melakukan Smart Rewrite.',
      },
      { status: 400 }
    );
  }
}
