import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export default function ArticlePreview({ title, article, onBack }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullText = `# ${title}\n\n${article.replace(/\[IMAGE:.*?\]/g, '').trim()}`;
    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderArticle = () => {
    const lines = article.split('\n');
    return lines.map((line, i) => {
      if (line.match(/^\[IMAGE:.*\]$/)) return null;
      if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">📄</span>
        <h2>記事プレビュー</h2>
      </div>

      <div className="article-actions">
        <button className="btn-secondary" onClick={onBack}>
          タイトル選択に戻る
        </button>
        <button className="btn-copy" onClick={handleCopy}>
          {copied ? '✓ コピーしました' : '記事をコピー'}
        </button>
      </div>

      <div className="article-preview">
        <h1 className="article-title">{title}</h1>
        <div className="article-body">{renderArticle()}</div>
      </div>
    </div>
  );
}
