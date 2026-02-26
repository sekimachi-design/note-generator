import { buildTitlePrompt } from '../prompts/titlePrompt';
import { buildArticlePrompt } from '../prompts/articlePrompt';

async function callGroq(apiKey, prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function generateTitles(apiKey, theme) {
  const prompt = buildTitlePrompt(theme);
  const text = await callGroq(apiKey, prompt);

  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('タイトルの解析に失敗しました');

  return JSON.parse(match[0]);
}

export async function generateArticle(apiKey, theme, title) {
  const prompt = buildArticlePrompt(theme, title);
  return await callGroq(apiKey, prompt);
}
