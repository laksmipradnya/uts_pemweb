import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playlist.css'; // Mengimpor file CSS untuk styling

const Gallery = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({
    play_name: '',
    play_url: '',
    play_thumbnail: '',
    play_genre: 'Music',
    play_description: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mengambil data video dari API saat komponen pertama kali dimuat
  useEffect(() => {
    axios.get('https://webfmsi.singapoly.com/api/playlist/51')  // Ganti dengan URL API yang sesuai
      .then((response) => {
        setVideos(response.data.datas);  // Menyimpan data video yang diterima
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat mengambil data video', error);
      });
  }, []);

  // Fungsi untuk menambah video baru ke API
  const addVideo = (e) => {
    e.preventDefault();  // Mencegah refresh halaman saat form disubmit

    axios.post('https://webfmsi.singapoly.com/api/playlist/51', {
      play_name: newVideo.play_name,
      play_url: newVideo.play_url,
      play_thumbnail: newVideo.play_thumbnail,
      play_genre: newVideo.play_genre,
      play_description: newVideo.play_description
    })
    .then((response) => {
      setVideos([...videos, response.data.datas]);  // Menambahkan video baru ke state
      setNewVideo({
        play_name: '',
        play_url: '',
        play_thumbnail: '',
        play_genre: 'Music',
        play_description: ''
      });
      setIsFormVisible(false);  // Menutup form setelah video ditambahkan
    })
    .catch((error) => {
      console.error('Terjadi kesalahan saat menambahkan video', error);
    });
  };

  // Fungsi untuk mengedit video
  const editVideo = (video) => {
    setEditVideoId(video.id_play);  // Set video yang sedang diedit
    setNewVideo({
      play_name: video.play_name,
      play_url: video.play_url,
      play_thumbnail: video.play_thumbnail,
      play_genre: video.play_genre,
      play_description: video.play_description
    });
    setIsFormVisible(true);  // Menampilkan form untuk edit video
  };

  // Fungsi untuk menyimpan perubahan video yang telah diedit ke API
  const saveUpdatedVideo = (e) => {
    e.preventDefault();  // Mencegah refresh halaman saat form disubmit

    axios.post('https://webfmsi.singapoly.com/api/playlist/update/${editVideoId}', {
      play_name: newVideo.play_name,
      play_url: newVideo.play_url,
      play_thumbnail: newVideo.play_thumbnail,
      play_genre: newVideo.play_genre,
      play_description: newVideo.play_description
    })
    .then((response) => {
      const updatedVideos = videos.map((video) =>
        video.id_play === editVideoId ? { ...video, ...newVideo } : video
      );
      setVideos(updatedVideos);  // Update state dengan video yang telah diedit
      setEditVideoId(null);  // Reset editVideoId setelah selesai
      setNewVideo({
        play_name: '',
        play_url: '',
        play_thumbnail: '',
        play_genre: 'Music',
        play_description: ''
      });
      setIsFormVisible(false);  // Menutup form setelah perubahan
    })
    .catch((error) => {
      console.error('Terjadi kesalahan saat mengedit video', error);
    });
  };

  // Fungsi untuk menghapus video dari API
  const deleteVideo = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus video ini?')) {
      axios.delete('https://webfmsi.singapoly.com/api/playlist/${id}')
        .then(() => {
          setVideos(videos.filter((video) => video.id_play !== id));  // Menghapus video dari state
        })
        .catch((error) => {
          console.error('Terjadi kesalahan saat menghapus video', error);
        });
    }
  };

  // Fungsi untuk menghandle perubahan genre video
  const handleGenreChange = (e) => {
    setNewVideo({ ...newVideo, play_genre: e.target.value });
  };

  // Fungsi untuk mencari video berdasarkan judul
  const filteredVideos = videos.filter(video =>
    video.play_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari video..."
        className="search-bar"
        value={searchQuery} // Pastikan ini hanya mengatur pencarian
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Add Button */}
      {!isFormVisible && (
        <button 
          className="add-video-btn"
          onClick={() => {
            setIsFormVisible(true); // Menampilkan form saat tombol + diklik
            setEditVideoId(null); // Reset editVideoId saat menambah video baru
            setNewVideo({
              play_name: '', // Reset form video
              play_url: '',
              play_thumbnail: '',
              play_genre: 'Music',
              play_description: ''
            });
          }}
        >
          <span className="plus-icon">+</span> {/* Hanya simbol + */}
        </button>
      )}

      {/* Add/Edit Video Form */}
      {isFormVisible && (
        <div className="form-container slide-in">
          <h2>{editVideoId ? 'Edit Video' : 'Add New Video'}</h2>
          <form onSubmit={editVideoId ? saveUpdatedVideo : addVideo}>
            <input
              type="text"
              value={newVideo.play_name}
              placeholder="Video Title"
              onChange={(e) => setNewVideo({ ...newVideo, play_name: e.target.value })}
              required
            />
            <input
              type="url"
              value={newVideo.play_url}
              placeholder="Video URL"
              onChange={(e) => setNewVideo({ ...newVideo, play_url: e.target.value })}
              required
            />
            <input
              type="text"
              value={newVideo.play_thumbnail}
              placeholder="Thumbnail URL"
              onChange={(e) => setNewVideo({ ...newVideo, play_thumbnail: e.target.value })}
              required
            />
            <textarea
              value={newVideo.play_description}
              placeholder="Description"
              onChange={(e) => setNewVideo({ ...newVideo, play_description: e.target.value })}
              required
            />
            <select value={newVideo.play_genre} onChange={handleGenreChange}>
              <option value="Music">Music</option>
              <option value="Song">Song</option>
              <option value="Movie">Movie</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>
            <button type="submit">{editVideoId ? 'Save Changes' : 'Add Video'}</button>
          </form>
          <button 
            className="cancel-btn" 
            onClick={() => setIsFormVisible(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <div key={video.id_play} className="video-card">
            <div className="thumbnail-container">
              <img
                src={video.play_thumbnail}
                alt={video.play_name}
                className="video-thumbnail"
              />
            </div>
            <div className="video-details">
              <h3>{video.play_name}</h3>
              <p>{video.play_description}</p>
            </div>
            <div className="video-actions">
              <button className="edit-btn" onClick={() => editVideo(video)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteVideo(video.id_play)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;