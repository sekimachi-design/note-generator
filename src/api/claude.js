import { buildTitlePrompt } from '../prompts/titlePrompt';
import { buildArticlePrompt } from '../prompts/articlePrompt';

async function callGemini(apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function generateTitles(apiKey, theme) {
  const prompt = buildTitlePrompt(theme);
  const text = await callGemini(apiKey, prompt);

  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('タイトルの解析に失敗しました');

  return JSON.parse(match[0]);
}

export async function generateArticle(apiKey, theme, title) {
  const prompt = buildArticlePrompt(theme, title);
  return await callGemini(apiKey, prompt);
}
