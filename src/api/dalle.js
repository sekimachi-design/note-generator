import { buildThumbnailPrompt, buildArticleImagePrompt } from '../prompts/imagePrompt';

async function callDalle(apiKey, prompt, size = '1792x1024') {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
      quality: 'standard',
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return `data:image/png;base64,${data.data[0].b64_json}`;
}

export async function generateThumbnail(apiKey, theme, title) {
  const prompt = buildThumbnailPrompt(theme, title);
  return await callDalle(apiKey, prompt, '1792x1024');
}

export async function generateArticleImage(apiKey, description) {
  const prompt = buildArticleImagePrompt(description);
  return await callDalle(apiKey, prompt, '1792x1024');
}
