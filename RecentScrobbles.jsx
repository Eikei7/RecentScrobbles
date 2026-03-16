import { useEffect, useState, useMemo } from 'react';
import './RecentScrobbles.css';

const getTimeAgo = (uts) => {
  const seconds = Math.floor(new Date().getTime() / 1000 - parseInt(uts));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};

const RecentScrobbles = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
  const USERNAME = 'Eikei'; // Change this to your Last.fm username
  
  const URL = useMemo(
    () => `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&limit=6&format=json`,
    [API_KEY]
  );

  useEffect(() => {
    if (!API_KEY) {
      console.error("API key is missing. Please set VITE_LASTFM_API_KEY in your .env file.");
      return;
    }
    
    const fetchTracks = () => {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          if (data.recenttracks?.track) {
            setTracks(data.recenttracks.track);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Could not fetch Last.fm data:", err);
          setLoading(false);
        });
    };

    fetchTracks();
    const interval = setInterval(fetchTracks, 30000);
    return () => clearInterval(interval);
  }, [URL, API_KEY]);

  if (loading) {
    return <p className="recent-tracks-loading">Loading scrobbles...</p>;
  }

  return (
    <div className="recent-tracks-container">
      <div className="recent-tracks-header">
        <h3>Recently Listened</h3>
      </div>

      <ul className="track-list">
        {tracks.map((track, index) => (
          <li key={track.date?.uts || `track-${index}`} className="track-item">
            <img 
              className="album-art"
              src={track.image[3]['#text'] || 'https://via.placeholder.com/70'} 
              alt="Album cover"
              draggable={false}
            />
            <div className="track-info">
              <span className="track-name" title={track.name}>{track.name}</span>
              <span className="artist-name">{track.artist['#text']}</span>
              <div className="track-status">
                {track['@attr']?.nowplaying === 'true' ? (
                  <span className="now-playing-badge">LISTENING NOW</span>
                ) : (
                  <span className="time-ago">
                    {track.date ? getTimeAgo(track.date.uts) : ''}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
        <div className="lastfm-link">
          <a href="https://www.last.fm/" target="_blank" rel="noopener noreferrer">
            Powered by <span className="lastfm-brand">Last.fm</span>
          </a>
        </div>
      </ul>
    </div>
  );
};

export default RecentScrobbles;