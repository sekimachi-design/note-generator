import { buildThumbnailPrompt, buildArticleImagePrompt } from '../prompts/imagePrompt';

function pollinationsUrl(prompt, width, height) {
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true`;
}

export async function generateThumbnail(theme, title) {
  const prompt = buildThumbnailPrompt(theme, title);
  return pollinationsUrl(prompt, 1280, 670);
}

export async function generateArticleImage(description) {
  const prompt = buildArticleImagePrompt(description);
  return pollinationsUrl(prompt, 1280, 720);
}
