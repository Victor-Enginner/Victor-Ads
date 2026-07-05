import { env } from '../config/env.js';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function chatCompletion(messages: Message[], model?: string): Promise<string> {
  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': env.FRONTEND_URL,
      'X-Title': 'Aurai AI',
    },
    body: JSON.stringify({
      model: model || env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenRouter error:', error);
    throw new Error('AI service unavailable');
  }

  const data = await response.json() as any;
  return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
}