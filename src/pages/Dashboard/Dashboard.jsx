import React, { useState } from "react";
import VideoCard from "../../components/VideoCard";
import "./Dashboard.css";

const videos = [
  {
    title: "A Magical Firefly  Who Saves the Forest Every Night | Full Anumated Family Movie in HD",
    channel: "Cinema Zone HD",
    views: "1,2 jt x ditonton",
    time: "4 Minggu yang lalu",
    duration: "1:23:37",
    play_thumbnail: "https://img.youtube.com/vi/c7tkONnwFGg/maxresdefault.jpg",
    play_url: "https://youtu.be/c7tkONnwFGg?si=uotraE0f1co74_Wi"
  },
  {
    title: "Whisnu Santika - Year Mix 2024 Special Edition Live at DWP 2024",
    channel: "Whisnu Santika",
    views: "3,8 jt x ditonton",
    time: "5 bulan yang lalu",
    duration: "58:47",
    thumbnail: "https://img.youtube.com/vi/gpbceCpm2ro/maxresdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/gpbceCpm2ro/maxresdefault.jpg",
    play_url: "https://youtu.be/gpbceCpm2ro?si=bQgRO2CbnuCHmVDL"
  },
  {
    title: "Summer mix - dj snake, avicii, justin bieber, rihanna, kygo, david guetta, calvin harris, jonas blue",
    channel: "Rammor",
    views: "9,3 jt x ditonton",
    time: "1 tahun yang lalu",
    duration: "1:07:06",
    thumbnail: "https://img.youtube.com/vi/JL-YFJTxftU/maxresdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/JL-YFJTxftU/maxresdefault.jpg",
    play_url: "https://youtu.be/JL-YFJTxftU?si=ZNnp6EIKZZH80MiD"
  },
  {
    title: "MFull Guide Belajar CODING untuk Pemula",
    channel: "xaviera putri",
    views: "931 rb x ditonton",
    time: "1 tahun yang lalu",
    duration: "19:09",
    thumbnail: "https://img.youtube.com/vi/QFLAuddS6qM/maxresdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/QFLAuddS6qM/maxresdefault.jpg",
    play_url: "https://youtu.be/QFLAuddS6qM?si=rYiQw7VHA-WVzyWj"
  },
  {
    title: "Maleficent (2014) Movie in English | Angelina Jolie , Elle Fanning, Sharlto Copley || Reviews & Facts",
    channel: "cinemaGEEK",
    views: "1,7 jt x ditonton",
    time: "1 bulan yang lalu",
    duration: "1:41:29",
    thumbnail: "https://img.youtube.com/vi/qsbJTBiFquw/maxresdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/qsbJTBiFquw/maxresdefault.jpg",
    play_url: "https://youtu.be/qsbJTBiFquw?si=TiFFYT8pItF0BdSw"
  },
  {
    title: "The 1975 - About You (Official)",
    channel: "The 1975",
    views: "78 jt x ditonton",
    time: "2 tahun yang lalu",
    duration: "5:26",
    thumbnail: "https://img.youtube.com/vi/tGv7CUutzqU/maxresdefault.jpg",
    play_thumbnail: "https://img.youtube.com/vi/tGv7CUutzqU/maxresdefault.jpg",
    play_url: "https://youtu.be/tGv7CUutzqU?si=ibAlNdARUAJuM5cv"
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const filteredVideos = videos.filter((video) =>
    `${video.title} ${video.channel}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enhanced notification system
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
            <VideoCard key={`${video.title}-${index}`} video={video} />
          ))
        ) : (
          <div className="empty-state">
            <h3>Tidak ada video yang ditemukan</h3>
            <p>Coba ubah kata kunci pencarian Anda</p>
          </div>
        )}
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;