import React, { useState, useEffect } from 'react';
import { Trash2, Play, Music, Album, Heart, Video, User, Clock, Library, Headphones } from 'lucide-react';
import axios from 'axios';
import './Koleksi.css'

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

// Kartu koleksi 
const GalleryCard = ({ item, onPlay, onDelete }) => (
  <div className="card" onClick={() => onPlay(item.play_url || item.url, item.play_title || item.title)}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(item.id, item.play_genre || item.genre);
      }}
      className="delete-button"
    >
      <Trash2 className="w-3 h-3" />
    </button>

    <div className="thumbnail">
      {/* Jika thumbnail adalah URL gambar, tampilkan gambar */}
      {typeof (item.play_thumbnail || item.thumbnail) === 'string' && 
       ((item.play_thumbnail || item.thumbnail).startsWith('http://') || 
        (item.play_thumbnail || item.thumbnail).startsWith('https://')) ? (
        <img 
          src={item.play_thumbnail || item.thumbnail} 
          alt={item.play_title || item.title} 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b282f066-7785-4595-ad5f-add02b34aefb.png'; 
          }} 
        />
      ) : (
        <span>{item.play_thumbnail || item.thumbnail}</span>
      )}
      <div className="overlay">
        <Play className="w-5 h-5" />
      </div>
    </div>

    <h3>{item.play_title || item.title}</h3>
    <span>{item.play_genre || item.genre}</span>
  </div>
);

const GalleryCollection = () => {
  const [currentView, setCurrentView] = useState('all');
  const [currentContent, setCurrentContent] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('Recent Activity');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const groupId = 51; // Group ID sesuai yang Anda sebutkan

  // Data fallback/demo yang sudah ada sebelumnya
  const [collections, setCollections] = useState({
    music: [
      { id: 9, title: "Bohemian Rhapsody - Queen", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4eb19868-5afa-44ab-b3ba-670e8bbead9c.png", url: "https://youtu.be/fJ9rUzIMcZQ?si=2EMuK1uBAq5lYEjh" },
      { id: 10, title: "Hotel California - Eagles", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/81a5c569-3942-4949-b62f-89a567b26e30.png", url: "https://youtu.be/09839DpTctU?si=9F25Un3Ugy-pYrMv" },
      { id: 11, title: "Stairway to Heaven - Led Zeppelin", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fbb2ca0d-cb9f-4481-be94-96f440f40fc6.png", url: "https://youtu.be/QkF3oxziUI4?si=5NLqGHRROz2pIqNg" },
      { id: 12, title: "Sweet Child O' Mine - Guns N' Roses", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/326738ff-2c20-4283-987c-b1d3c84a4ff2.png'+Mine+Album", url: "https://youtu.be/1w7OgIMMRc4?si=of2cOQvXH1AjUi_E" },
      { id: 13, title: "Imagine - John Lennon", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1f314624-79e9-4761-9ae3-b0f44a4464f5.png", url: "https://youtu.be/dT4hLudO-is?si=t-D-Mis85JLqrDSL" },
      { id: 14, title: "Billie Jean - Michael Jackson", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70676b33-11d9-4d10-91e2-92a1ef34364c.png", url: "https://youtu.be/Zi_XLOBDo_Y?si=5rPDVIGb5BfTAblv" },
      { id: 15, title: "Like a Rolling Stone - Bob Dylan", genre: "music", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/37b97dfd-9777-4933-b8c2-66791dce1839.png", url: "https://youtu.be/IwOfCgkyEj0?si=mO_qjXdZHzfc9Gvu" }
    ],
    songs: [
      { id: 16, title: "Blinding Lights - The Weeknd", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6a2314c-e728-4b05-8c72-b19ad409af7c.png", url: "https://youtu.be/4NRXx6U8ABQ?si=idCwH2bVZHT56nKo" },
      { id: 17, title: "Shape of You - Ed Sheeran", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e6e08e5e-349d-4455-adbd-fec46e7b530b.png", url: "https://youtu.be/JGwWNGJdvx8?si=ilpg51VdqzlAknoO" },
      { id: 18, title: "Bad Guy - Billie Eilish", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a4973064-9531-4cb6-bc02-f3afd8589d7a.png", url: "https://youtu.be/DyDfgMOUjCI?si=nfKgfe2OWvDtp_TW" },
      { id: 19, title: "Watermelon Sugar - Harry Styles", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1186814d-b6b1-48b1-9105-feee58aad68f.png", url: "https://youtu.be/E07s5ZYygMg?si=wi_HHFvHUJJ3zJtL" },
      { id: 20, title: "Levitating - Dua Lipa", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f257ce79-0a1d-4499-9262-2e674d6ca327.png", url: "https://youtu.be/TUVcZfQe-Kw?si=aw9oF3wWyul2BFuU" },
      { id: 21, title: "Good 4 U - Olivia Rodrigo", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/beca448c-d051-4fb3-9f93-b89bc95398cf.png", url: "https://youtu.be/gNi_6U5Pm_o?si=ybMf82t5_CnEcb-p" },
      { id: 22, title: "Stay - The Kid LAROI & Justin Bieber", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f4e35f4-6589-41c4-b17a-8df7553cf81d.png", url: "https://youtu.be/kTJczUoc26U?si=9N1-fUK5f-njoGM1" },
      { id: 23, title: "Industry Baby - Lil Nas X", genre: "songs", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fcb501c5-f6d9-4110-9dd6-a7ef01c07585.png", url: "https://youtu.be/UTHLKHL_whs?si=Nvqlqf6jkDv9b-to" }
    ],
    movies: [
      { id: 24, title: "Avengers: Endgame Trailer", genre: "movies", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/63b7f6ee-b916-49e2-995b-88692864ed6b.png", url: "https://youtu.be/hA6hldpSTF8?si=I1IZqH6-P2NII8fT" },
      { id: 25, title: "The Batman - Official Trailer", genre: "movies", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fb85e0a1-f5f8-4220-9c2e-87e90ef2262d.png", url: "https://youtu.be/mqqft2x_Aa4?si=7WyawwsJ--yWom-C" },
      { id: 26, title: "Top Gun: Maverick Clips", genre: "movies", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3bd64b63-5bc8-4697-bab1-ee8f9b48829e.png", url: "https://youtu.be/IXbnzEHZDPg?si=RaXNuFboElW4okX1" },
      { id: 27, title: "Spider-Man: No Way Home", genre: "movies", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/81612318-9ae5-4512-9ce7-69d4bc2c5fda.png", url: "https://youtu.be/JfVOs4VSpmA?si=Al8rVYzxBCIbS_Kg" },
      { id: 28, title: "Dune - Behind the Scenes", genre: "movies", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba97d457-bae3-447c-bdd4-99d4ce958458.png", url: "https://youtu.be/UvtiiuyO-gU?si=uv3RpXuoJkc7OAaP" },
      { id: 29, title: "Fast & Furious 9 Action", genre: "movies", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fdbaf190-b0b0-45cc-b131-d53824770b6b.png", url: "https://youtu.be/-3WKURMtI9A?si=x-4BKO04XOfBn1t_" }
    ],
    education: [
      { id: 30, title: "JavaScript Fundamentals", genre: "education", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/20eff7e4-4536-45c3-a4fc-dd02bac27bab.png", url: "https://youtu.be/2Ji-clqUYnA?si=HCyJJTE7R-Dj0UkZ" },
      { id: 31, title: "Digital Marketing 101", genre: "education", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a11b7b3-222c-4d9a-934c-72b30d9c729d.png", url: "https://youtu.be/h95cQkEWBx0?si=VtJhfYlCM6C9Z4Cc" },
      { id: 32, title: "Photography Basics", genre: "education", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/da28226f-9974-41a7-bbc6-bb678cd38873.png", url: "https://youtu.be/V7z7BAZdt2M?si=b0WiojD4m6OHFYXN" },
      { id: 33, title: "Web Design Principles", genre: "education", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0263f748-2b38-4f7a-87db-5940b5d57a50.png", url: "https://youtu.be/GJN7TemsZtY?si=Spn-wt4mWh3sB2Js" },
      { id: 34, title: "Data Science Introduction", genre: "education", thumbnail: "https://placehold.co/400x200?text=Data+Science+Introduction", url: "https://youtu.be/edZ_JYpOM8U?si=h_eAWbMLCV4kkzTw" }
    ],
    others: [
      { id: 35, title: "Chill Vibes Mix", genre: "others", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/35105b6e-909a-4364-81ce-6ab1715a2b57.png", url: "https://youtu.be/EWQRGiw3vWA?si=JhSFszUx_ZkDMHMm" },
      { id: 36, title: "Blinding Lights", genre: "others", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ab984cc7-9f76-4b82-9b32-1df18984a9b7.png", url: "https://youtu.be/4NRXx6U8ABQ?si=V1IE1jjrYvxXQdS-" },
      { id: 37, title: "JavaScript Tutorial", genre: "others", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ddc4dec1-dbec-418e-a59d-4546a563112f.png", url: "https://youtu.be/EerdGm-ehJQ?si=hlVu99eAxE4H7EPa" },
      { id: 38, title: "Avengers Trailer", genre: "others", thumbnail: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/92721eb8-363e-4be3-a330-80454e35fd50.png", url: "https://youtu.be/6ZfuNTqbHE8?si=to3zRBurSeNvkArH" }
    ]
  });

  // Fetch data dari API saat komponen dimount
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://webfmsi.singapoly.com/api/playlist/${groupId}`);
        
        if (response.data && Array.isArray(response.data)) {
          setPlaylists(response.data);
          
          // Gabungkan data API dengan collections yang sudah ada
          const apiCollections = groupPlaylistsByGenre(response.data);
          setCollections(prevCollections => ({
            ...prevCollections,
            ...apiCollections
          }));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading playlist:', err);
        setError('Gagal memuat data playlist dari server');
        // Tetap gunakan data demo jika API gagal
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [groupId]);

  // Fungsi untuk mengelompokkan playlist berdasarkan genre
  const groupPlaylistsByGenre = (playlistData) => {
    const grouped = {
      music: [],
      songs: [],
      movies: [],
      education: [],
      others: []
    };

    playlistData.forEach(item => {
      const genre = item.play_genre || 'others';
      if (grouped[genre]) {
        grouped[genre].push({
          id: item.id,
          title: item.play_title,
          genre: item.play_genre,
          thumbnail: item.play_thumbnail,
          url: item.play_url
        });
      }
    });

    return grouped;
  };

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
    // Cari item di collections
    const currentCategoryItems = collections[category];
    const item = currentCategoryItems.find(i => i.id === itemId);

    if (!item) return;

    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus "${item.title || item.play_title}" dari koleksi?`);
    if (!confirmDelete) return;

    try {
      // Jika item berasal dari API (memiliki properti play_title), kirim DELETE request
      if (item.play_title || playlists.find(p => p.id === itemId)) {
        await axios.delete(`https://webfmsi.singapoly.com/api/playlist/${itemId}`);
        
        // Update state playlists
        setPlaylists(prev => prev.filter(p => p.id !== itemId));
      }

      // Update collections
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
      console.error('Error deleting playlist:', error);
      alert('Gagal menghapus playlist. Silakan coba lagi.');
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
      <div style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="loading-spinner">
          <p>Loading playlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      minHeight: '100vh',
    }}>

        {/* Main Content */}
        <main className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">My Collection</h1>
            {error && (
              <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                {error}
              </div>
            )}
          </div>


        {/* Collection Navigation */}
        <div className="collection-nav">
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

        {/* Content Section */}
        <div className="content-section">
          <h2 className="section-title">
            <span></span>
            {sectionTitle}
          </h2>

          {currentContent.length === 0 ? (
            <div className="empty-state">
              <p>No content found in this category.</p>
              <p>Start adding videos to see them here!</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {currentContent.map(item => (
                <GalleryCard
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

export default GalleryCollection;