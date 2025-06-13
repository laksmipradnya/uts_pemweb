import React, { useState } from 'react';
import { Search, Bell, Plus, Menu, Mic, Settings, User, LogOut, Upload, History, PlaySquare, Clock, Bookmark, ThumbsUp } from 'lucide-react';

const YouTubeHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      channel: "CURHAT BANG Denny Sumargo",
      action: "mengunggah",
      title: "PANSOS & CARI VIEWERS!? PERTAMA KALI BABY ISSA DATENG KE PODCAST...",
      time: "2 jam yang lalu",
      thumbnail: "https://img.youtube.com/vi/7H5-hZ-Hs4g/mqdefault.jpg",
      isNew: true
    },
    {
      id: 2,
      channel: "Windah Basudara",
      action: "streaming",
      title: "RUMAH TEMPAT JIWA JIWA YANG TERSESAT....",
      time: "5 jam yang lalu",
      thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/mqdefault.jpg",
      isNew: true
    },
    {
      id: 3,
      channel: "NIKITA WILLY OFFICIAL",
      action: "mengunggah",
      title: "DINIKITA KARENA GAYA PARENTING & APAPUN YANG AKU LAKUKAN SALAH DI MATA NETIZEN",
      time: "1 hari yang lalu",
      thumbnail: "https://img.youtube.com/vi/sample/mqdefault.jpg",
      isNew: false
    }
  ];

  const profileMenuItems = [
    { icon: User, label: "Channel Anda", divider: false },
    { icon: Settings, label: "Pengaturan", divider: false },
    { icon: Upload, label: "Buat", divider: true },
    { icon: History, label: "Histori", divider: false },
    { icon: PlaySquare, label: "Video Anda", divider: false },
    { icon: Clock, label: "Tonton Nanti", divider: false },
    { icon: Bookmark, label: "Playlist", divider: false },
    { icon: ThumbsUp, label: "Video yang Disukai", divider: true },
    { icon: LogOut, label: "Keluar", divider: false }
  ];

  return (
    <div className="bg-white shadow-sm border-b">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">▶</span>
            </div>
            <span className="text-xl font-semibold">YouTube</span>
            <span className="text-xs text-gray-500 ml-1">ID</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex items-center flex-1 max-w-md mx-8">
          <div className="flex items-center w-full">
            <div className="flex-1 flex items-center border border-gray-300 rounded-l-full px-4 py-2">
              <input
                type="text"
                placeholder="Telusuri"
                className="flex-1 outline-none text-gray-700"
              />
            </div>
            <button className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button className="ml-4 p-2 hover:bg-gray-100 rounded-full">
            <Mic className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Create Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Buat</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Bell className="w-6 h-6" />
              {notifications.some(n => n.isNew) && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {notifications.filter(n => n.isNew).length}
                  </span>
                </div>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">Notifikasi</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 border-b cursor-pointer ${
                        notification.isNew ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex space-x-3">
                        <img
                          src={notification.thumbnail}
                          alt=""
                          className="w-16 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{notification.channel}</span>
                            {' '}{notification.action}{' '}
                            <span className="font-medium">{notification.title}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {notification.isNew && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <button className="text-blue-600 text-sm hover:underline">
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Telusuri</p>
                      <p className="text-sm text-gray-500">@telusuri</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline mt-2">
                    Kelola Akun Google Anda
                  </button>
                </div>

                <div className="py-2">
                  {profileMenuItems.map((item, index) => (
                    <div key={index}>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-left">
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                      {item.divider && <hr className="my-2" />}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <a href="#" className="hover:text-gray-700">Tentang</a>
                    <a href="#" className="hover:text-gray-700">Pers</a>
                    <a href="#" className="hover:text-gray-700">Hak Cipta</a>
                    <a href="#" className="hover:text-gray-700">Hubungi kami</a>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">© 2024 Google LLC</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-2 border-t">
        <div className="flex space-x-3 overflow-x-auto">
          {['Semua', 'Game', 'Podcast', 'Berita', 'Live', 'Musik', 'Mix', 'Matematika', 'Animasi', 'Game petualangan aksi', 'Memasak', 'Baru diupload'].map((category, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                index === 0
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
};

export default YouTubeHeader;