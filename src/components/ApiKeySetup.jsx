import { useState } from 'react';

export default function ApiKeySetup({ onComplete }) {
  const [claudeKey, setClaudeKey] = useState(
    () => localStorage.getItem('claude_api_key') || ''
  );
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claudeKey.trim()) {
      setError('APIキーを入力してください');
      return;
    }
    localStorage.setItem('claude_api_key', claudeKey.trim());
    onComplete();
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">🔑</span>
        <h2>APIキー設定</h2>
        <p className="step-description">
          記事生成にはClaude APIのキーが必要です。
          キーはブラウザのローカルストレージにのみ保存され、外部に送信されません。
          画像生成は無料のPollinations.aiを使用するため、追加のキーは不要です。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="api-key-form">
        <div className="form-group">
          <label htmlFor="claude-key">Claude API Key (Anthropic)</label>
          <input
            id="claude-key"
            type="password"
            value={claudeKey}
            onChange={(e) => setClaudeKey(e.target.value)}
            placeholder="sk-ant-..."
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
