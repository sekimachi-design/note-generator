import { useState } from 'react';

export default function ApiKeySetup({ onComplete }) {
  const [groqKey, setGroqKey] = useState(
    () => localStorage.getItem('groq_api_key') || ''
  );
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groqKey.trim()) {
      setError('APIキーを入力してください');
      return;
    }
    localStorage.setItem('groq_api_key', groqKey.trim());
    onComplete();
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">🔑</span>
        <h2>APIキー設定</h2>
        <p className="step-description">
          記事生成にはGroq APIのキーが必要です（無料）。
          <br />
          <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">
            Groq Console
          </a>
          からAPIキーを取得できます（Googleアカウントでログイン可）。
          <br />
          キーはブラウザのローカルストレージにのみ保存され、外部に送信されません。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="api-key-form">
        <div className="form-group">
          <label htmlFor="groq-key">Groq API Key</label>
          <input
            id="groq-key"
            type="password"
            value={groqKey}
            onChange={(e) => setGroqKey(e.target.value)}
            placeholder="gsk_..."
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
