import React, { useState, useEffect, useRef } from 'react';
import './music-player_App.css';

const MOCK_PLAYLIST = [
  {
    id: 1,
    title: 'Midnight Horizon',
    artist: 'Luna Eclipse',
    album: 'Neon Dreams',
    duration: 215, // seconds (3:35)
    coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '🌙',
  },
  {
    id: 2,
    title: 'Cyber Pulse',
    artist: 'SynthWave Division',
    album: 'Future City',
    duration: 184, // seconds (3:04)
    coverColor: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Ocean Breeze',
    artist: 'Acoustic Chill',
    album: 'Summer Echoes',
    duration: 242, // seconds (4:02)
    coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: '🌊',
  },
  {
    id: 4,
    title: 'Starlight Odyssey',
    artist: 'Cosmic Drift',
    album: 'Deep Space',
    duration: 198, // seconds (3:18)
    coverColor: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
    icon: '✨',
  },
  {
    id: 5,
    title: 'Golden Sunset',
    artist: 'Velvet Groove',
    album: 'Lo-Fi Sessions',
    duration: 165, // seconds (2:45)
    coverColor: 'linear-gradient(135deg, #b224ef 0%, #7579ff 100%)',
    icon: '🌅',
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const currentSong = MOCK_PLAYLIST[currentIndex];
  const timerRef = useRef(null);

  // Simulated audio progress runner using setInterval
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= currentSong.duration) {
            handleSongEnd();
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, currentSong.duration]);

  const handleSongEnd = () => {
    if (isRepeat) {
      setCurrentTime(0);
    } else if (isShuffle) {
      let nextRand = Math.floor(Math.random() * MOCK_PLAYLIST.length);
      if (nextRand === currentIndex) nextRand = (currentIndex + 1) % MOCK_PLAYLIST.length;
      setCurrentIndex(nextRand);
      setCurrentTime(0);
    } else {
      handleNext();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_PLAYLIST.length);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_PLAYLIST.length) % MOCK_PLAYLIST.length);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  const handleSelectSong = (index) => {
    setCurrentIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = (currentTime / currentSong.duration) * 100;

  return (
    <div className="player-container">
      <div className="player-card">
        {/* Top Header */}
        <div className="player-header">
          <span className="badge">NOW PLAYING</span>
          <span className="playlist-count">{currentIndex + 1} of {MOCK_PLAYLIST.length}</span>
        </div>

        {/* Album Art Container */}
        <div className="album-art-wrapper">
          <div
            className={`album-art ${isPlaying ? 'playing-glow' : ''}`}
            style={{ background: currentSong.coverColor }}
          >
            <div className="vinyl-groove">
              <span className="album-icon">{currentSong.icon}</span>
            </div>
          </div>
        </div>

        {/* Song & Artist Info */}
        <div className="song-info">
          <h2 className="song-title">{currentSong.title}</h2>
          <p className="song-artist">{currentSong.artist} • <span className="song-album">{currentSong.album}</span></p>
        </div>

        {/* Progress Slider */}
        <div className="progress-section">
          <input
            type="range"
            min="0"
            max={currentSong.duration}
            value={currentTime}
            onChange={handleSeek}
            className="seek-slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 ${progressPercent}%, #374151 ${progressPercent}%)`
            }}
          />
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="controls">
          <button
            className={`icon-btn ${isShuffle ? 'active' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
            title="Toggle Shuffle"
          >
            🔀
          </button>

          <button className="icon-btn nav-btn" onClick={handlePrev} title="Previous Song">
            ⏮
          </button>

          <button className="play-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>

          <button className="icon-btn nav-btn" onClick={handleNext} title="Next Song">
            ⏭
          </button>

          <button
            className={`icon-btn ${isRepeat ? 'active' : ''}`}
            onClick={() => setIsRepeat(!isRepeat)}
            title="Toggle Repeat"
          >
            🔁
          </button>
        </div>

        {/* Volume Control */}
        <div className="volume-section">
          <button
            className="volume-icon"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="volume-slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%)`
            }}
          />
        </div>

        {/* Playlist Queue */}
        <div className="playlist-queue">
          <h3>Playlist Queue</h3>
          <div className="queue-list">
            {MOCK_PLAYLIST.map((song, idx) => (
              <div
                key={song.id}
                className={`queue-item ${idx === currentIndex ? 'active-song' : ''}`}
                onClick={() => handleSelectSong(idx)}
              >
                <div className="queue-left">
                  <span className="queue-index">
                    {idx === currentIndex && isPlaying ? '🎵' : idx + 1}
                  </span>
                  <div>
                    <div className="queue-title">{song.title}</div>
                    <div className="queue-artist">{song.artist}</div>
                  </div>
                </div>
                <span className="queue-duration">{formatTime(song.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
