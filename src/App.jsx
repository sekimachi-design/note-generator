import { useState, useCallback } from 'react';
import ApiKeySetup from './components/ApiKeySetup';
import ThemeInput from './components/ThemeInput';
import TitleSelect from './components/TitleSelect';
import ArticlePreview from './components/ArticlePreview';
import ImageGallery from './components/ImageGallery';
import { generateTitles, generateArticle } from './api/claude';
import { generateThumbnail, generateArticleImage } from './api/dalle';
import './App.css';

const STEPS = ['apiKey', 'theme', 'title', 'result'];

function getStepIndex(step) {
  return STEPS.indexOf(step);
}

export default function App() {
  const [step, setStep] = useState(() => {
    return localStorage.getItem('claude_api_key') ? 'theme' : 'apiKey';
  });
  const [theme, setTheme] = useState('');
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [article, setArticle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [articleImages, setArticleImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getKey = (name) => localStorage.getItem(name) || '';

  const handleApiKeyComplete = () => setStep('theme');

  const handleThemeSubmit = useCallback(async (inputTheme) => {
    setTheme(inputTheme);
    setLoading(true);
    setError('');
    try {
      const result = await generateTitles(getKey('claude_api_key'), inputTheme);
      setTitles(result);
      setStep('title');
    } catch (err) {
      setError(`タイトル生成エラー: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTitleSelect = useCallback(async (title) => {
    setSelectedTitle(title);
    setLoading(true);
    setError('');
    try {
      const articleText = await generateArticle(getKey('claude_api_key'), theme, title);
      setArticle(articleText);
      setStep('result');

      // Generate images (Pollinations.ai - returns URLs instantly)
      const thumbUrl = await generateThumbnail(theme, title);
      setThumbnail(thumbUrl);

      const imageMatches = articleText.match(/\[IMAGE:\s*(.*?)\]/g) || [];
      const descriptions = imageMatches.map((m) => m.replace(/\[IMAGE:\s*/, '').replace(/\]$/, ''));
      const images = await Promise.all(
        descriptions.map(async (desc) => {
          const url = await generateArticleImage(desc);
          return { url, description: desc };
        })
      );
      setArticleImages(images);
    } catch (err) {
      setError(`記事生成エラー: ${err.message}`);
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [theme]);

  const handleReset = () => {
    setStep('theme');
    setTheme('');
    setTitles([]);
    setSelectedTitle('');
    setArticle('');
    setThumbnail(null);
    setArticleImages([]);
    setError('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 onClick={handleReset} style={{ cursor: 'pointer' }}>
          note記事ジェネレーター
        </h1>
        <p className="app-subtitle">テーマを入力するだけで、バズる記事を自動生成</p>
        {step !== 'apiKey' && (
          <button
            className="btn-settings"
            onClick={() => setStep('apiKey')}
          >
            APIキー設定
          </button>
        )}
      </header>

      <div className="progress-bar">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`progress-step ${getStepIndex(step) >= i ? 'active' : ''} ${step === s ? 'current' : ''}`}
          >
            <span className="progress-dot" />
            <span className="progress-label">
              {['API設定', 'テーマ', 'タイトル', '結果'][i]}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      <main className="app-main">
        {step === 'apiKey' && <ApiKeySetup onComplete={handleApiKeyComplete} />}
        {step === 'theme' && <ThemeInput onSubmit={handleThemeSubmit} loading={loading} />}
        {step === 'title' && (
          <TitleSelect
            titles={titles}
            onSelect={handleTitleSelect}
            onBack={() => setStep('theme')}
            loading={loading}
          />
        )}
        {step === 'result' && (
          <>
            <ArticlePreview
              title={selectedTitle}
              article={article}
              onBack={() => {
                setArticle('');
                setThumbnail(null);
                setArticleImages([]);
                setStep('title');
              }}
            />
            <ImageGallery
              thumbnail={thumbnail}
              articleImages={articleImages}
              title={selectedTitle}
            />
            <div className="restart-section">
              <button className="btn-primary" onClick={handleReset}>
                新しい記事を作成する
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
