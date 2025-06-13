import React, { useState } from 'react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const { title, channel, views, time, duration, thumbnail, play_thumbnail, play_url } = video;
  const [isInCollection, setIsInCollection] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Function to handle image error and use fallback
  const handleImageError = (e) => {
    // If play_thumbnail fails, try regular thumbnail
    if (e.target.src === play_thumbnail && thumbnail) {
      e.target.src = thumbnail;
    } else {
      // If all fails, use placeholder
      e.target.src = 'https://via.placeholder.com/320x180/f0f0f0/999999?text=No+Image';
    }
  };

  // Handle collection toggle
  const handleCollectionToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInCollection(!isInCollection);
    
    // Show notification (you can customize this)
    const action = !isInCollection ? 'ditambahkan ke' : 'dihapus dari';
    console.log(`Video "${title.substring(0, 30)}..." ${action} koleksi`);
  };

  // Handle download
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDownloading || isDownloaded) return;
    
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
      console.log(`Video "${title.substring(0, 30)}..." berhasil didownload (${duration})`);
      
      // Reset download state after 3 seconds
      setTimeout(() => {
        setIsDownloaded(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="video-card">
      {/* Thumbnail with play_url link */}
      <div className="video-thumbnail-container">
        {play_url ? (
          <a
            href={play_url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-thumbnail-link"
            title="Klik untuk menonton video"
          >
            <img 
              src={play_thumbnail || thumbnail} 
              alt={title} 
              className="video-thumbnail"
              onError={handleImageError}
            />
            <div className="play-overlay">
              <div className="play-button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="play-icon"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        ) : (
          <img 
            src={play_thumbnail || thumbnail} 
            alt={title} 
            className="video-thumbnail"
            onError={handleImageError}
          />
        )}
        
        {/* Video Actions */}
        <div className="video-actions">
          <button 
            className={`action-btn collection-btn ${isInCollection ? 'active' : ''}`}
            onClick={handleCollectionToggle}
            title={isInCollection ? 'Hapus dari koleksi' : 'Tambahkan ke koleksi'}
          >
            {isInCollection ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
          </button>
          
          <button 
            className={`action-btn download-btn ${isDownloading ? 'loading' : ''} ${isDownloaded ? 'success' : ''}`}
            onClick={handleDownload}
            title="Download video"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loading-icon">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
            ) : isDownloaded ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            )}
          </button>
        </div>
        
        <div className="video-duration">{duration}</div>
      </div>

      {/* Video Info */}
      <div className="video-info">
        <h3 className="video-title">
          {play_url ? (
            <a
              href={play_url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-title-link"
              title="Klik untuk menonton video"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="video-channel">{channel}</p>
        <p className="video-meta">
          {views} • {time}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;