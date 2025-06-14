import React, { useState, useEffect } from 'react';
import './Download.css';

const Kelas4C = () => {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "Justin Bieber - Holy ft. Chance The Rapper",
      size: "154 MB",
      totalSize: "154 MB",
      progress: 100,
      status: "completed",
      genre: "education",
      thumbnail: "https://pbs.twimg.com/media/EiIiQWMXsAM8-jB?format=jpg&name=900x900"
    },
    {
      id: 2,
      title: "a day in my life 🤍 | Vlog aesthetic + morning routine",
      size: "89 MB",
      totalSize: "234 MB",
      progress: 38,
      status: "downloading",
      genre: "education",
      thumbnail: "https://i.pinimg.com/736x/4d/31/6f/4d316f46f3601d8f41e043cbbac0e7ee.jpg"
    },
    {
      id: 3,
      title: "Dia Datang Saat Lampu Padam... 😨 | Short Horror Movie",
      size: "198 MB",
      totalSize: "198 MB",
      progress: 100,
      status: "completed",
      genre: "education",
      thumbnail: "https://i.pinimg.com/736x/47/3d/49/473d49ee56de1ed63eee87597750dd08.jpg"
    },
    {
      id: 4,
      title: "CERITA RUMAH KOSONG DI PINGGIR HUTAN 😱 | Podcast Tengah Malam",
      size: "0 MB",
      totalSize: "456 MB",
      progress: 0,
      status: "queued",
      genre: "education",
      thumbnail: "https://i.pinimg.com/736x/a3/c4/17/a3c41787c3fd44304e23774fc9bcef2a.jpg"
    },
    {
      id: 5,
      title: "Makeup Simpel Tapi Bikin Glowing ✨ | 5 Menit Sebelum Zoom!",
      size: "167 MB",
      totalSize: "203 MB",
      progress: 82,
      status: "downloading",
      genre: "education",
      thumbnail: "https://i.pinimg.com/736x/f1/74/b0/f174b05e82db99b5b0db01549ac0096b.jpg"
    },
    {
      id: 6,
      title: "BREAKING NEWS! 😲 | Fakta Mengejutkan di Balik Kasus Ini...",
      size: "687 MB",
      totalSize: "687 MB",
      progress: 100,
      status: "completed",
      genre: "education",
      thumbnail: "https://i.pinimg.com/736x/a3/32/94/a3329403119862d7448a246747d1e83d.jpg"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads(prev =>
        prev.map(download => {
          if (download.status === 'downloading' && download.progress < 100) {
            const newProgress = Math.min(download.progress + Math.random() * 2, 100);
            const newSize = Math.floor((newProgress / 100) * parseInt(download.totalSize));
            return {
              ...download,
              progress: newProgress,
              size: `${newSize} MB`,
              status: newProgress >= 100 ? 'completed' : 'downloading'
            };
          }
          return download;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (id, action) => {
    switch (action) {
      case 'pause':
        setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'paused' } : d));
        break;
      case 'resume':
      case 'start':
        setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'downloading' } : d));
        break;
      case 'cancel':
      case 'remove':
        if (window.confirm(`Yakin ingin ${action === 'cancel' ? 'membatalkan' : 'menghapus'} item ini?`)) {
          setDownloads(prev => prev.filter(d => d.id !== id));
        }
        break;
      case 'play':
        console.log(`Playing video ${id}`);
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'downloading': return '#3b82f6';
      case 'queued': return '#f59e0b';
      case 'paused': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'downloading': return 'Mengunduh';
      case 'queued': return 'Antrian';
      case 'paused': return 'Dijeda';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div className="container">
      <div className="main-wrapper">
        <main className="main-content">
          <div className="section-title">📥 Daftar Unduhan</div>
          <div className="downloads-grid">
            {downloads.map(d => (
              <div key={d.id} className="download-card">
                <div className="thumbnail">
                  <img src={d.thumbnail} alt={d.title} />
                  <div className="status-badge" style={{ background: getStatusColor(d.status) }}>
                    {getStatusText(d.status)}
                  </div>
                </div>
                <div className="card-content">
                  <div className="video-title">{d.title}</div>
                  <div className="video-info">
                    <span>{d.size} dari {d.totalSize}</span>
                    <span>{Math.floor(d.progress)}%</span>
                  </div>
                  <div className="actions">
                    {d.status === 'downloading' && <button onClick={() => handleAction(d.id, 'pause')}>Pause</button>}
                    {d.status === 'paused' && <button onClick={() => handleAction(d.id, 'resume')}>Resume</button>}
                    {d.status === 'queued' && <button onClick={() => handleAction(d.id, 'start')}>Start</button>}
                    <button onClick={() => handleAction(d.id, 'remove')}>Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Kelas4C;
