import { useState } from 'react';

export default function ThemeInput({ onSubmit, loading }) {
  const [theme, setTheme] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theme.trim()) return;
    onSubmit(theme.trim());
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">✍️</span>
        <h2>テーマを入力</h2>
        <p className="step-description">
          書きたい記事のテーマを入力してください。バズるタイトルを5案生成します。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="theme-form">
        <textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="例: フリーランスエンジニアの時間管理術"
          rows={3}
          disabled={loading}
        />
        <button type="submit" className="btn-primary" disabled={!theme.trim() || loading}>
          {loading ? (
            <span className="loading-text">
              <span className="spinner" />
              タイトルを生成中...
            </span>
          ) : (
            'タイトルを生成する'
          )}
        </button>
      </form>
    </div>
  );
}
