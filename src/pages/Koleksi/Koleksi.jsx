import React, { useState, useEffect } from 'react';
import { Trash2, Play, Music, Album, Heart, Video, User, Clock, Library, Headphones, MoreVertical, Download } from 'lucide-react';
import './Koleksi.css';

// Utility function to format duration
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Utility function to format views
const formatViews = (views) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

// Utility function to format upload time
const formatUploadTime = (daysAgo) => {
  if (daysAgo < 7) {
    return `${daysAgo} hari yang lalu`;
  } else if (daysAgo < 30) {
    const weeks = Math.floor(daysAgo / 7);
    return `${weeks} minggu yang lalu`;
  } else if (daysAgo < 365) {
    const months = Math.floor(daysAgo / 30);
    return `${months} bulan yang lalu`;
  } else {
    const years = Math.floor(daysAgo / 365);
    return `${years} tahun yang lalu`;
  }
};

// Tombol kategori 
const CategoryButton = ({ icon, label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`category-button ${active ? 'active' : ''}`}
  >
    {icon}
    {label} ({count})
  </button>
);

// YouTube-style card component
const YouTubeCard = ({ item, onPlay, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(item.id, item.play_genre || item.genre);
    setShowOptions(false);
  };

  return (
    <div className="youtube-card">
      <div className="youtube-thumbnail" onClick={() => onPlay(item.play_url || item.url, item.play_title || item.title)}>
        <img 
          src={item.play_thumbnail || item.thumbnail} 
          alt={item.play_title || item.title}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b282f066-7785-4595-ad5f-add02b34aefb.png'; 
          }} 
        />
        <div className="thumbnail-overlay">
          <Play className="play-icon" />
        </div>
        <div className="duration-badge">
          {formatDuration(item.duration || Math.floor(Math.random() * 600) + 120)}
        </div>
      </div>
      
      <div className="youtube-content">
        <div className="video-info">
          <h3 className="video-title">{item.play_title || item.title}</h3>
          <div className="video-meta">
            <span className="channel-name">
              {item.channel || getChannelName(item.play_genre || item.genre)}
            </span>
            <div className="meta-details">
              <span className="views">
                {formatViews(item.views || Math.floor(Math.random() * 10000000) + 100000)} x ditonton
              </span>
              <span className="separator">•</span>
              <span className="upload-time">
                {formatUploadTime(item.uploadedDaysAgo || Math.floor(Math.random() * 365) + 1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="options-menu">
          <button 
            className="options-btn"
            onClick={handleOptionsClick}
            title="Opsi lainnya"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={handleDeleteClick} className="delete-option"> 
                <Trash2 className="w-4 h-4" />
                Hapus dari koleksi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// Function to get channel name based on genre
const getChannelName = (genre) => {
  const channels = {
    music: 'Music World HD',
    songs: 'Top Hits Channel',
    movies: 'Cinema Zone HD',
    education: 'Learn Academy',
    others: 'Entertainment Hub'
  };
  return channels[genre] || 'Default Channel';
};

const MyCollection = () => {
  const [currentView, setCurrentView] = useState('all');
  const [currentContent, setCurrentContent] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('Recent Activity');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const groupId = 51;

  // Enhanced demo data with realistic YouTube-like information
  const [collections, setCollections] = useState({
    music: [
      { 
        id: 9, 
        title: "Bohemian Rhapsody - Queen (Official Video)", 
        genre: "music", 
        thumbnail: "https://i3.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg", 
        url: "https://youtu.be/fJ9rUzIMcZQ?si=2EMuK1uBAq5lYEjh",
        duration: 355,
        views: 19381801,
        uploadedDaysAgo: 2847,
        channel: "Queen Official"
      },
      { 
        id: 10, 
        title: "Hotel California - Eagles (Official Video)", 
        genre: "music", 
        thumbnail: "https://img.youtube.com/vi/09839DpTctU/sddefault.jpg", 
        url: "https://youtu.be/09839DpTctU?si=9F25Un3Ugy-pYrMv",
        duration: 391,
        views: 8928421,
        uploadedDaysAgo: 1847,
        channel: "Eagles"
      },
      { 
        id: 11, 
        title: "Stairway to Heaven - Led Zeppelin", 
        genre: "music", 
        thumbnail: "https://img.youtube.com/vi/QkF3oxziUI4/maxresdefault.jpg", 
        url: "https://youtu.be/QkF3oxziUI4?si=5NLqGHRROz2pIqNg",
        duration: 482,
        views: 5348293,
        uploadedDaysAgo: 2184,
        channel: "Led Zeppelin"
      }
    ],
    songs: [
      { 
        id: 16, 
        title: "Blinding Lights - The Weeknd (Official Music Video)", 
        genre: "songs", 
        thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/maxresdefault.jpg", 
        url: "https://youtu.be/4NRXx6U8ABQ?si=idCwH2bVZHT56nKo",
        duration: 200,
        views: 28473928,
        uploadedDaysAgo: 847,
        channel: "The Weeknd"
      },
      { 
        id: 17, 
        title: "Shape of You - Ed Sheeran (Official Music Video)", 
        genre: "songs", 
        thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/sddefault.jpg", 
        url: "https://youtu.be/JGwWNGJdvx8?si=ilpg51VdqzlAknoO",
        duration: 233,
        views: 58473927,
        uploadedDaysAgo: 2647,
        channel: "Ed Sheeran"
      }
    ],
    movies: [
      { 
        id: 24, 
        title: "Avengers: Endgame - Official Trailer", 
        genre: "movies", 
        thumbnail: "https://img.youtube.com/vi/hA6hldpSTF8/maxresdefault.jpg", 
        url: "https://youtu.be/hA6hldpSTF8?si=I1IZqH6-P2NII8fT",
        duration: 147,
        views: 8473928,
        uploadedDaysAgo: 1847,
        channel: "Marvel Entertainment"
      },
      { 
        id: 25, 
        title: "The Batman - Official Trailer", 
        genre: "movies", 
        thumbnail: "https://img.youtube.com/vi/mqqft2x_Aa4/maxresdefault.jpg", 
        url: "https://youtu.be/mqqft2x_Aa4?si=7WyawwsJ--yWom-C",
        duration: 178,
        views: 2348473,
        uploadedDaysAgo: 647,
        channel: "Warner Bros. Pictures"
      }
    ],
    education: [
      { 
        id: 30, 
        title: "JavaScript Tutorial for Beginners - Full Course", 
        genre: "education", 
        thumbnail: "https://img.youtube.com/vi/2Ji-clqUYnA/maxresdefault.jpg", 
        url: "https://youtu.be/2Ji-clqUYnA?si=HCyJJTE7R-Dj0UkZ",
        duration: 7230,
        views: 384732,
        uploadedDaysAgo: 147,
        channel: "freeCodeCamp.org"
      },
      { 
        id: 31, 
        title: "Digital Marketing Complete Course 2024", 
        genre: "education", 
        thumbnail: "https://img.youtube.com/vi/h95cQkEWBx0/maxresdefault.jpg", 
        url: "https://youtu.be/h95cQkEWBx0?si=VtJhfYlCM6C9Z4Cc",
        duration: 4320,
        views: 1247392,
        uploadedDaysAgo: 47,
        channel: "Simplilearn"
      }
    ],
    others: [
      { 
        id: 35, 
        title: "Chill Vibes Mix - 24/7 Study Music", 
        genre: "others", 
        thumbnail: "https://img.youtube.com/vi/EWQRGiw3vWA/maxresdefault.jpg", 
        url: "https://youtu.be/EWQRGiw3vWA?si=JhSFszUx_ZkDMHMm",
        duration: 86400,
        views: 847392,
        uploadedDaysAgo: 347,
        channel: "ChillHop Music"
      }
    ]
  });

  useEffect(() => {
    showAllCollection();
  }, [collections]);

  const showAllCollection = () => {
    setCurrentView('all');
    setSectionTitle('🕒 Recent Activity');
    const recentItems = [
      ...collections.songs.slice(0, 3),
      ...collections.music.slice(0, 2),
      ...collections.movies.slice(0, 2),
      ...collections.education.slice(0, 1),
      ...collections.others.slice(0, 2)
    ];
    setCurrentContent(recentItems);
  };

  const showCategory = (category) => {
    setCurrentView(category);
    const titles = {
      music: '💽 Music Albums',
      songs: '🎶 Liked Songs',
      movies: '📼 Movie Clips',
      education: '👤 Educational Content',
      others: '🎧 Others'
    };
    setSectionTitle(titles[category]);
    setCurrentContent(collections[category] || []);
  };

  const deleteItem = async (itemId, category) => {
    const currentCategoryItems = collections[category];
    const item = currentCategoryItems.find(i => i.id === itemId);

    if (!item) return;

    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus "${item.title || item.play_title}" dari koleksi?`);
    if (!confirmDelete) return;

    try {
      setCollections(prevCollections => {
        const updatedItems = currentCategoryItems.filter(i => i.id !== itemId);
        const updatedCollections = { ...prevCollections, [category]: updatedItems };

        if (currentView === category) {
          setCurrentContent(updatedItems);
        } else if (currentView === 'all') {
          const recentItems = [
            ...updatedCollections.songs.slice(0, 3),
            ...updatedCollections.music.slice(0, 2),
            ...updatedCollections.movies.slice(0, 2),
            ...updatedCollections.education.slice(0, 1),
            ...updatedCollections.others.slice(0, 2)
          ];
          setCurrentContent(recentItems);
        }

        return updatedCollections;
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Gagal menghapus item. Silakan coba lagi.');
    }
  };

  const openVideo = (url, title) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`🎵 "${title}" — This is a demo video! In a real app, this would open the actual content.`);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      music: <Album className="w-4 h-4" />,
      songs: <Heart className="w-4 h-4" />,
      movies: <Video className="w-4 h-4" />,
      education: <User className="w-4 h-4" />,
      others: <Headphones className="w-4 h-4" />
    };
    return icons[category];
  };

  if (loading) {
    return (
      <div className="my-collection-loading-container">
        <div className="my-collection-loading-spinner">
          <p>Loading playlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-collection-gallery-container">
      <main className="my-collection-container">
        <div className="my-collection-page-header">
          <h1 className="my-collection-page-title">My Collection</h1>
          {error && (
            <div className="my-collection-error-message">
              {error}
            </div>
          )}
        </div>

        <div className="my-collection-nav">
          <CategoryButton
            icon={<Library className="w-4 h-4" />}
            label="All My Collection"
            count={Object.values(collections).flat().length}
            active={currentView === 'all'}
            onClick={showAllCollection}
          />
          {Object.keys(collections).map(cat => (
            <CategoryButton
              key={cat}
              icon={getCategoryIcon(cat)}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
              count={collections[cat].length}
              active={currentView === cat}
              onClick={() => showCategory(cat)}
            />
          ))}
        </div>

        <div className="my-collection-content-section">
          <h2 className="my-collection-section-title">
            {sectionTitle}
          </h2>

          {currentContent.length === 0 ? (
            <div className="my-collection-empty-state">
              <p>No content found in this category.</p>
              <p>Start adding videos to see them here!</p>
            </div>
          ) : (
            <div className="my-collection-youtube-grid">
              {currentContent.map(item => (
                <YouTubeCard
                  key={item.id}
                  item={item}
                  onPlay={openVideo}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCollection;