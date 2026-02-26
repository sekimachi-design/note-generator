import { buildTitlePrompt } from '../prompts/titlePrompt';
import { buildArticlePrompt } from '../prompts/articlePrompt';

async function callClaude(apiKey, prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

export async function generateTitles(apiKey, theme) {
  const prompt = buildTitlePrompt(theme);
  const text = await callClaude(apiKey, prompt);

  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('タイトルの解析に失敗しました');

  return JSON.parse(match[0]);
}

export async function generateArticle(apiKey, theme, title) {
  const prompt = buildArticlePrompt(theme, title);
  return await callClaude(apiKey, prompt);
}
