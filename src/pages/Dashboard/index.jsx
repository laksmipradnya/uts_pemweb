import React, { useState } from "react";
import VideoCard from "../../components/VideoCard";
import "./Dashboard.css";

const videos = [
  {
    title: "PANSOS & CARI VIEWERS!? PERTAMA KALI BABY ISSA DATENG KE PODCAST...",
    channel: "CURHAT BANG Denny Sumargo",
    views: "2,9 jt x ditonton",
    time: "1 tahun yang lalu",
    duration: "40.20",
    thumbnail: "https://img.youtube.com/vi/7H5-hZ-Hs4g/mqdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/7H5-hZ-Hs4g/maxresdefault.jpg",
    play_url: "https://www.youtube.com/watch?v=7H5-hZ-Hs4g"
  },
  {
    title: "RUMAH TEMPAT JIWA JIWA YANG TERSESAT....",
    channel: "Windah Basudara",
    views: "1,1 jt x ditonton",
    time: "Streaming 2 minggu yang lalu",
    duration: "1.24.04",
    thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/mqdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/maxresdefault.jpg",
    play_url: "https://www.youtube.com/watch?v=3fumBcKC6RE"
  },
  // Duplikat untuk contoh
  {
    title: "RUMAH TEMPAT JIWA JIWA YANG TERSESAT....",
    channel: "Windah Basudara",
    views: "1,1 jt x ditonton",
    time: "Streaming 2 minggu yang lalu",
    duration: "1.24.04",
    thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/mqdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/maxresdefault.jpg",
    play_url: "https://www.youtube.com/watch?v=3fumBcKC6RE"
  },
  {
    title: "RUMAH TEMPAT JIWA JIWA YANG TERSESAT....",
    channel: "Windah Basudara",
    views: "1,1 jt x ditonton",
    time: "Streaming 2 minggu yang lalu",
    duration: "1.24.04",
    thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/mqdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/maxresdefault.jpg",
    play_url: "https://www.youtube.com/watch?v=3fumBcKC6RE"
  },
  {
    title: "RUMAH TEMPAT JIWA JIWA YANG TERSESAT....",
    channel: "Windah Basudara",
    views: "1,1 jt x ditonton",
    time: "Streaming 2 minggu yang lalu",
    duration: "1.24.04",
    thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/mqdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/maxresdefault.jpg",
    play_url: "https://www.youtube.com/watch?v=3fumBcKC6RE"
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const filteredVideos = videos.filter((video) =>
    `${video.title} ${video.channel}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Optional: Enhanced notification system
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      {/* Header bar */}
      <div className="header-bar">
        <h2 className="header-title">Beranda</h2>
        <div className="search-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari video atau channel..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))
        ) : (
          <p>Tidak ada video yang cocok.</p>
        )}
      </div>

      {/* Optional: Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;