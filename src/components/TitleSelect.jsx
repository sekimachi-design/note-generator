import { useState } from 'react';

export default function TitleSelect({ titles, onSelect, onBack, loading }) {
  const [selected, setSelected] = useState(null);

  const handleGenerate = () => {
    if (selected !== null) {
      onSelect(titles[selected]);
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">📝</span>
        <h2>タイトルを選択</h2>
        <p className="step-description">
          5つのタイトル案から、記事に使いたいものを1つ選んでください。
        </p>
      </div>

      <div className="title-list">
        {titles.map((title, i) => (
          <button
            key={i}
            className={`title-option ${selected === i ? 'selected' : ''}`}
            onClick={() => setSelected(i)}
            disabled={loading}
          >
            <span className="title-number">{i + 1}</span>
            <span className="title-text">{title}</span>
          </button>
        ))}
      </div>

      <div className="button-group">
        <button className="btn-secondary" onClick={onBack} disabled={loading}>
          テーマ入力に戻る
        </button>
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={selected === null || loading}
        >
          {loading ? (
            <span className="loading-text">
              <span className="spinner" />
              記事・画像を生成中...
            </span>
          ) : (
            'この記事を生成する'
          )}
        </button>
      </div>
    </div>
  );
}
