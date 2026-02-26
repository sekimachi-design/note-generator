import { useState } from 'react';

export default function ApiKeySetup({ onComplete }) {
  const [geminiKey, setGeminiKey] = useState(
    () => localStorage.getItem('gemini_api_key') || ''
  );
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!geminiKey.trim()) {
      setError('APIキーを入力してください');
      return;
    }
    localStorage.setItem('gemini_api_key', geminiKey.trim());
    onComplete();
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">🔑</span>
        <h2>APIキー設定</h2>
        <p className="step-description">
          記事生成にはGoogle Gemini APIのキーが必要です（無料枠あり）。
          <br />
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
            Google AI Studio
          </a>
          からAPIキーを取得できます。
          <br />
          キーはブラウザのローカルストレージにのみ保存され、外部に送信されません。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="api-key-form">
        <div className="form-group">
          <label htmlFor="gemini-key">Gemini API Key (Google)</label>
          <input
            id="gemini-key"
            type="password"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIza..."
            autoComplete="off"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-primary">
          設定を保存して始める
        </button>
      </form>
    </div>
  );
}
