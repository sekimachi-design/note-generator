import { downloadImage } from '../utils/clipboard';

export default function ImageGallery({ thumbnail, articleImages, title }) {
  const handleDownload = (dataUrl, name) => {
    downloadImage(dataUrl, name);
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <span className="step-icon">🖼️</span>
        <h2>生成画像</h2>
        <p className="step-description">
          サムネイルと記事中画像をダウンロードできます。
        </p>
      </div>

      {thumbnail && (
        <div className="image-section">
          <h3>サムネイル（1280×670推奨）</h3>
          <div className="image-card thumbnail-card">
            <img src={thumbnail} alt="サムネイル" />
            <button
              className="btn-download"
              onClick={() => handleDownload(thumbnail, `${title}_thumbnail.png`)}
            >
              ダウンロード
            </button>
          </div>
        </div>
      )}

      {articleImages.length > 0 && (
        <div className="image-section">
          <h3>記事中画像</h3>
          <div className="image-grid">
            {articleImages.map((img, i) => (
              <div key={i} className="image-card">
                <img src={img.url} alt={img.description} />
                <p className="image-desc">{img.description}</p>
                <button
                  className="btn-download"
                  onClick={() => handleDownload(img.url, `${title}_image_${i + 1}.png`)}
                >
                  ダウンロード
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!thumbnail && articleImages.length === 0 && (
        <div className="loading-section">
          <span className="spinner large" />
          <p>画像を生成中...</p>
        </div>
      )}
    </div>
  );
}
