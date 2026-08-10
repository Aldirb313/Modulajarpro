import { NextResponse } from 'next/server';
import { AIContentRequestSchema } from '@/lib/ai/types';
import { GeminiAIServiceAdapter } from '@/lib/ai/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = AIContentRequestSchema.parse(body);

    const aiService = new GeminiAIServiceAdapter();
    const documentResult = await aiService.generateDocument(validatedData);

    return NextResponse.json({
      success: true,
      data: documentResult,
    });
  } catch (error: any) {
    console.error('API Error in /api/generate:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Terjadi kesalahan saat memproses permintaan AI.',
      },
      { status: 400 }
    );
  }
}
