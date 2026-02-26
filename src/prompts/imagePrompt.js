export function buildThumbnailPrompt(theme, title) {
  return `Create a visually striking, modern thumbnail image for a Japanese blog article.
Theme: ${theme}
Title: ${title}

Requirements:
- Clean, minimal design with bold visual impact
- Use vibrant but harmonious colors
- Abstract or conceptual imagery (no text in the image)
- Professional quality, suitable for a blog thumbnail
- Modern, trendy aesthetic
- The image should evoke the theme without being too literal`;
}

export function buildArticleImagePrompt(description) {
  return `Create an illustration for a Japanese blog article.
Scene description: ${description}

Requirements:
- Clean, modern illustration style
- Soft, pleasant colors
- No text in the image
- Professional quality
- The image should complement a written article`;
}
