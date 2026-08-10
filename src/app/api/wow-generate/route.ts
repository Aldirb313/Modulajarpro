import { NextResponse } from 'next/server';
import { WOWGenerationRequestSchema } from '@/lib/ai/wow-types';
import { WOWPromptEngine } from '@/lib/ai/wow-prompt-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = WOWGenerationRequestSchema.parse(body);

    const { systemPrompt, userPrompt } = WOWPromptEngine.buildPrompt(validated);
    const apiKey = process.env.GEMINI_API_KEY || '';

    if (!apiKey) {
      // Graceful Fallback Mock WOW Response
      return NextResponse.json({
        success: true,
        data: {
          title: `[MOCK WOW ${validated.category.toUpperCase()}] ${validated.topic}`,
          category: validated.category,
          type: validated.type,
          promptUsed: userPrompt,
          message: 'Fitur WOW Generator berhasil di-trigger (Mode Dev Mock).'
        }
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.8,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawJsonText || '{}');

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error('API Error in /api/wow-generate:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal memproses fitur WOW Generator.',
      },
      { status: 400 }
    );
  }
}
