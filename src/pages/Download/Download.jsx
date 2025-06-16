import React, { useState, useEffect } from 'react';
import './Download.css';

const getYoutubeThumbnail = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const getYoutubeVideoId = (url) => {
  return url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
};

const Download = () => {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "ME TIME VLOG🧖🏻‍♀️✨*self reward* + glowing up! : nyalon, new nails, shopping, selfcare 💅🏻🧘🏻‍♀️",
      size: "154 MB",
      totalSize: "154",
      progress: 100,
      status: "completed",
      genre: "education",
      youtubeUrl: "https://youtu.be/u6QDeLN5MvA?si=WrDiigu4PHUjPNjv",
      duration: "22:37"
    },
    {
      id: 2,
      title: "MISTERI HILANGNYA KAPAL SARAH JOE",
      size: "89 MB",
      totalSize: "234",
      progress: 38,
      status: "downloading",
      genre: "education",
      youtubeUrl: "https://youtu.be/AWTkI_8EqGI?si=febTydblbq2XGFAI",
      duration: "28:35"
    },
    {
      id: 3,
      title: "PRESTON CASTLE THE BEGINNING – DMS [ Penelusuran ]",
      size: "198 MB",
      totalSize: "198",
      progress: 100,
      status: "completed",
      genre: "education",
      youtubeUrl: "https://youtu.be/cBDTYI4slt4?si=-cnpPiJkgPYVf4c4",
      duration: "01:03:59"
    },
    {
      id: 4,
      title: "#suaratirta NETIZEN BERTANYA LAGI, dr. TIRTA MENJAWAB KEMBALI: MITOS & FAKTA KESEHATAN!",
      size: "198 MB",
      totalSize: "198",
      progress: 100,
      status: "completed",
      genre: "education",
      youtubeUrl: "https://youtu.be/YEAq10ZdbdU?si=tevIrWeJC1IEd8Wj",
      duration: "25:33"
    },
    {
      id: 5,
      title: "Membuka Portal Kembali | CIREBON PART TWO Eps.2",
      size: "105 MB",
      totalSize: "234",
      progress: 42,
      status: "downloading",
      youtubeUrl: "https://youtu.be/qMwrvUFCDjE?si=henV3tr92m0ChtHS",
      duration: "01:01:22"
    },
    {
      id: 6,
      title: "Misteri Apa yang Ada di Laut Terdalam?",
      size: "0 MB",
      totalSize: "15",
      progress: 0,
      status: "queued",
      youtubeUrl: "https://youtu.be/mkD7Ip9_sAk?si=34It2lLtdqxpTsSg",
      duration: "5:36"
    }
    // Tambahkan lainnya jika perlu
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
      case 'completed': return 'Complete';
      case 'downloading': return 'Downloading';
      case 'queued': return 'Queue';
      case 'paused': return 'Pause';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div className="download-container">
      <div className="download-main-wrapper">
        <main className="download-main-content">
          <div className="download-section-title">📥 Download List</div>
          <div className="download-grid">
            {downloads.map(d => (
              <div key={d.id} className="download-item-card">
                <div className="download-thumbnail">
                  <img
                    src={getYoutubeThumbnail(d.youtubeUrl)}
                    alt={d.title}
                    className="download-thumbnail-img"
                  />
                  <div className="download-hover-overlay">
                    <button
                      className="download-play-button"
                      onClick={() => window.open(d.youtubeUrl, "_blank")}
                    >
                      ▶
                    </button>
                    <div className="download-video-duration">{d.duration}</div>
                  </div>
                  <div className="download-status-badge" style={{ background: getStatusColor(d.status) }}>
                    {getStatusText(d.status)}
                  </div>
                </div>
                <div className="download-card-content">
                  <div className="download-video-title">{d.title}</div>
                  <div className="download-video-info">
                    <span>{d.size} dari {d.totalSize} MB</span>
                    <span>{Math.floor(d.progress)}%</span>
                  </div>
                  <div className="download-actions">
                    {d.status === 'downloading' && <button onClick={() => handleAction(d.id, 'pause')}>Pause</button>}
                    {d.status === 'paused' && <button onClick={() => handleAction(d.id, 'resume')}>Resume</button>}
                    {d.status === 'queued' && <button onClick={() => handleAction(d.id, 'start')}>Start</button>}
                    <button onClick={() => handleAction(d.id, 'remove')}>Delete</button>
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

export default Download;