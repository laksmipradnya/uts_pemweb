import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

// Video manual tambahan (luar API)
const manualVideos = [
  {
    id: "manual-1",
    title: "SZA Top Songs Playlist - to (study, chill, sleep) ૮ ˶ᵔ ᵕ ᵔ˶ ა",
    genre: "song",
    description: "SZA Top Songs Playlist - to (study, chill, sleep) ૮ ˶ᵔ ᵕ ᵔ˶ ა Listen to the playlist we've made! Hope you like it!",
    play_thumbnail: "https://img.youtube.com/vi/xvv44XEqcHI/maxresdefault.jpg",
    play_url: "https://youtu.be/xvv44XEqcHI?si=5Bu25tjdNts_VPgL"
  },
  {
    id: "manual-2",
    title: "Full Guide Belajar CODING untuk Pemula",
    genre: "education",
    description: "Double Major in Computer Science dan Business Tech, at Korea Advanced Institute of Science and Technology (KAIST), South Korea. Specialization in Data-Science and AI",
    play_thumbnail: "https://img.youtube.com/vi/QFLAuddS6qM/maxresdefault.jpg",
    play_url: "https://youtu.be/QFLAuddS6qM?si=rYiQw7VHA-WVzyWj"
  },
  {
    id: "manual-3",
    title: "The Canterville Ghost | 2023 | Bahasa Indonesia Dubbed | Animation & Horror Movie",
    genre: "movie",
    description: "Sir Simon de Canterville telah menghantui tanah perkebunan miliknya selama lebih dari 300 tahun, menanamkan ketakutan kepada siapa pun yang berani menempati rumahnya",
    play_thumbnail: "https://img.youtube.com/vi/PmpWDHv1aNQ/maxresdefault.jpg",
    play_url: "https://youtu.be/PmpWDHv1aNQ?si=buo2y53w6mR8RtgF"
  },
  {
    id: "manual-4",
    title: "DAY 1-🔥 Ethical Hacking 2025 Full Ultimate Course | 25-HOUR MASTERCLASS | Go From Beginner to PRO!",
    genre: "education",
    description: "🚨 Transform Into a Cybersecurity Expert in 2025! 🚨This 25-Hour Ethical Hacking Masterclass is the most comprehensive, hands-on course ever created for aspiring hackers, IT professionals, and cybersecurity enthusiasts",
    play_thumbnail: "https://img.youtube.com/vi/AfM4WYMNzaY/maxresdefault.jpg",
    play_url: "https://youtu.be/AfM4WYMNzaY?si=bkxuiEPWelnaw30U"
  }
];

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [collection, setCollection] = useState(() => JSON.parse(localStorage.getItem("collection")) || {});
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    axios.get("https://webfmsi.singapoly.com/api/playlist/51")
      .then((response) => {
        const fetched = response.data.datas.map(item => ({
          id: item.id_play,
          title: item.play_name,
          genre: item.play_genre,
          description: item.play_description,
          play_thumbnail: item.play_thumbnail,
          play_url: item.play_url
        }));
        setVideos([...fetched, ...manualVideos]);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data video", error);
        setVideos([...manualVideos]);
      });
  }, []);

  const filteredVideos = videos.filter((video) =>
    `${video.title} ${video.genre}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const toggleCollection = (id) => {
    setCollection((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("collection", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-bar">
        <h2 className="dashboard-header-title">Dashboard</h2>
        <div className="dashboard-search-wrapper">
          <input
            type="text"
            placeholder="Search..."
            className="dashboard-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-video-grid">
        {videos.length === 0 ? (
          <div className="dashboard-empty-state">
            <p>Loading videos...</p>
          </div>
        ) : filteredVideos.length > 0 || searchTerm === "" ? (
          filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isInCollection={collection[video.id]}
              onToggleCollection={() => toggleCollection(video.id)}
              onNotify={showNotification}
              isActive={activeVideoId === video.id}
              onActivate={() => setActiveVideoId(video.id)}
              onDeactivate={() => setActiveVideoId(null)}
            />
          ))
        ) : (
          <div className="dashboard-empty-state">
            <h3>Oops! Nothing matched your search</h3>
            <p>Please try different keywords</p>
          </div>
        )}
      </div>

      {notification && (
        <div className={`dashboard-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

const VideoCard = ({ video, isInCollection, onToggleCollection, onNotify, isActive, onActivate, onDeactivate }) => {
  const { title, genre, description, play_thumbnail, play_url } = video;
  const [downloadState, setDownloadState] = useState(() => {
    const saved = localStorage.getItem(`downloaded_${video.id}`);
    return saved === "done" ? "done" : "idle";
  });

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (downloadState !== "idle") return;
    setDownloadState("downloading");
    onNotify("Downloading... Please see more details in the Download menu", "info");
    setTimeout(() => {
      setDownloadState("done");
      localStorage.setItem(`downloaded_${video.id}`, "done");
      onNotify("Download completed for: " + title.substring(0, 30) + "...", "success");
    }, 8000);
  };

  return (
    <div
      className={`dashboard-video-card ${isActive ? 'dashboard-video-card--active' : ''}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
    >
      <div className="dashboard-video-thumbnail-container">
        <a href={play_url} target="_blank" rel="noopener noreferrer" className="dashboard-video-thumbnail-link">
          <img src={play_thumbnail} alt={title} className="dashboard-video-thumbnail" />
          <div className="dashboard-play-overlay">
            <div className="dashboard-play-button">
              <svg className="dashboard-play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </a>

        <div className="dashboard-video-actions">
          <button
            className="dashboard-action-btn dashboard-collection-btn"
            onClick={(e) => { e.stopPropagation(); onToggleCollection(); onNotify(isInCollection ? 'Cancel save' : 'Add to collection', 'info'); }}
            title={isInCollection ? "Cancel save" : "Add to collection"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isInCollection ? '#FF6B6B' : 'none'} stroke="#FF6B6B" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                11.54L12 21.35z"/>
            </svg>
          </button>

          <button
            className="dashboard-action-btn dashboard-download-btn"
            onClick={handleDownload}
            title="Download video"
            disabled={downloadState === "downloading"}
          >
            {downloadState === "downloading" ? (
              <svg className="dashboard-loading-icon" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2a10 10 0 1 1-7.07 2.93"/>
              </svg>
            ) : downloadState === "done" ? (
              <svg width="20" height="20" fill="none" stroke="green" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v4h4v-4h3l-5-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="dashboard-video-info">
        <div className="dashboard-video-title">
          <a href={play_url} className="dashboard-video-title-link" target="_blank" rel="noopener noreferrer">{title}</a>
        </div>
        <div className="dashboard-video-genre">{genre}</div>
        <div className="dashboard-video-meta">{description}</div>
      </div>
    </div>
  );
};

export default Dashboard;
