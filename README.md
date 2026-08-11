# Dark Music Player React Component

A sleek dark-mode music player with a playlist queue and simulated playback controls built with React and CSS.

## Features
- **5 Pre-loaded Track Playlist**: Complete with title, artist, album name, custom gradients, and track artwork
- **Interactive Controls**: Play, pause, skip forward, skip backward, shuffle mode, and repeat track toggle
- **Simulated Audio Progress**: Real-time timer simulation using `setInterval` that tracks current track progress and auto-advances when finished
- **Interactive Seek Bar**: Seek directly to any point in the track with real-time gradient fill
- **Volume Controller**: Volume slider with quick mute/unmute button
- **Animated Vinyl Artwork**: Rotating glow and vinyl groove animation while playing
- **Queue Manager**: Interactive list allowing one-click track selection and active playback indicators

## Setup and Usage

1. Copy `music-player_App.jsx` and `music-player_App.css` into your Vite React project.
2. Render the app inside `src/main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './music-player_App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

3. Launch Vite server:
```bash
npm run dev
```
