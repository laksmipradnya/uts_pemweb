import React, { useState } from "react";
import "./Genre.css";

const genres = [
  {
    name: "Music",
    img: "https://th.bing.com/th?q=Icon+of+Music&w=120&h=120&c=1&rs=1",
  },
  {
    name: "Song",
    img: "https://th.bing.com/th/id/OIP.FyoAafHeMuVip-_TZcF65QHaHa?w=179&h=180",
  },
  {
    name: "Movie",
    img: "https://th.bing.com/th/id/OIP.5BDCdir4mYPipuHgApQXqQHaFL?w=284&h=199",
  },
  {
    name: "Education",
    img: "https://th.bing.com/th/id/OIP.pSuOtZASywAsBmvR0BsCDgHaGL?w=253&h=211",
  },
];

const videosByGenre = {
  Music: [
    {
      title: "Relaxing Music",
      url: "https://www.youtube.com/embed/2OEL4P1Rz04",
      duration: "40:20",
      channel: "Chill Vibes",
      views: "2,9 jt x ditonton",
      time: "1 tahun yang lalu",
    },
    {
      title: "Chill Beats",
      url: "https://www.youtube.com/embed/5qap5aO4i9A",
      duration: "1:24:04",
      channel: "LoFi Channel",
      views: "1,1 jt x ditonton",
      time: "Streaming 2 minggu yang lalu",
    },
    {
      title: "Focus Music",
      url: "https://www.youtube.com/embed/hHW1oY26kxQ",
      duration: "1:00:00",
      channel: "Focus Flow",
      views: "980 rb x ditonton",
      time: "3 bulan yang lalu",
    },
    {
      title: "Jazz Instrumental",
      url: "https://www.youtube.com/embed/DWcJFNfaw9c",
      duration: "58:00",
      channel: "Jazz Cafe",
      views: "850 rb x ditonton",
      time: "6 bulan yang lalu",
    },
  ],
  Song: [
    {
      title: "Top Song 2023",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "4:05",
      channel: "VEVO",
      views: "3 jt x ditonton",
      time: "1 tahun yang lalu",
    },
    {
      title: "Viral Hits",
      url: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      duration: "4:41",
      channel: "Luis Fonsi",
      views: "8 jt x ditonton",
      time: "2 tahun yang lalu",
    },
    {
      title: "Bad Guy",
      url: "https://www.youtube.com/embed/DyDfgMOUjCI",
      duration: "3:25",
      channel: "Billie Eilish",
      views: "2,5 jt x ditonton",
      time: "1 tahun yang lalu",
    },
    {
      title: "Señorita",
      url: "https://www.youtube.com/embed/Pkh8UtuejGw",
      duration: "3:11",
      channel: "Shawn Mendes",
      views: "4 jt x ditonton",
      time: "3 tahun yang lalu",
    },
    {
      title: "Yellow",
      url: "https://www.youtube.com/embed/yKNxeF4KMsY",
      duration: "4:29",
      channel: "Coldplay",
      views: "1,7 jt x ditonton",
      time: "10 bulan yang lalu",
    },
  ],
  Movie: [
    {
      title: "Short Film",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      duration: "12:00",
      channel: "IndieFlix",
      views: "1 jt x ditonton",
      time: "6 bulan yang lalu",
    },
    {
      title: "Mini Drama",
      url: "https://www.youtube.com/embed/mw5VIEIvuMI",
      duration: "9:10",
      channel: "MiniStory",
      views: "600 rb x ditonton",
      time: "3 bulan yang lalu",
    },
  ],
  Education: [
    {
      title: "React Tutorial",
      url: "https://www.youtube.com/embed/bMknfKXIFA8",
      duration: "2:30:00",
      channel: "Web Dev Simplified",
      views: "1,3 jt x ditonton",
      time: "1 tahun yang lalu",
    },
    {
      title: "JavaScript Basics",
      url: "https://www.youtube.com/embed/W6NZfCO5SIk",
      duration: "1:00:00",
      channel: "Programming with Mosh",
      views: "2 jt x ditonton",
      time: "3 tahun yang lalu",
    },
    {
      title: "Python for Beginners",
      url: "https://www.youtube.com/embed/_uQrJ0TkZlc",
      duration: "4:26:52",
      channel: "FreeCodeCamp.org",
      views: "5 jt x ditonton",
      time: "2 tahun yang lalu",
    },
    {
      title: "HTML Crash Course",
      url: "https://www.youtube.com/embed/UB1O30fR-EE",
      duration: "1:10:00",
      channel: "Traversy Media",
      views: "1,5 jt x ditonton",
      time: "4 tahun yang lalu",
    },
    {
      title: "CSS in 20 Minutes",
      url: "https://www.youtube.com/embed/1PnVor36_40",
      duration: "20:00",
      channel: "Web Dev Simplified",
      views: "800 rb x ditonton",
      time: "1 tahun yang lalu",
    },
  ],
};

function GenreBrowser() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
  };

  return (
    <main className="genre-browser-main-content">
      <h1 className="title">Browse Genres</h1>

      <section className="genre-browser-container">
        {genres.map((genre) => (
          <article
            key={genre.name}
            className="genre-browser-card"
            tabIndex={0}
            role="button"
            onClick={() => handleGenreClick(genre.name)}
            aria-label={`${genre.name} genre`}
          >
            <img src={genre.img} alt={`${genre.name} genre`} />
            <div className="genre-browser-name">{genre.name}</div>
          </article>
        ))}
      </section>

      {selectedGenre && (
        <section className="genre-browser-video-section">
          <h2>{selectedGenre} Videos</h2>
          <div className="genre-browser-video-grid">
            {(videosByGenre[selectedGenre] || []).map((video, index) => (
              <div key={index} className="genre-browser-video-card">
                <a
                  href={video.url.replace("embed/", "watch?v=")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumbnail-link"
                >
                  <div className="genre-browser-video-thumbnail">
                    <img
                      src={`https://img.youtube.com/vi/${video.url.split("embed/")[1]}/hqdefault.jpg`}
                      alt={video.title}
                    />
                    <div className="genre-browser-video-duration">{video.duration}</div>
                  </div>
                </a>
                <div className="genre-browser-video-info">
                  <div className="genre-browser-video-title">{video.title}</div>
                  <div className="genre-browser-video-meta">
                    {video.channel}<br />
                    {video.views} • {video.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default GenreBrowser;