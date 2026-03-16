# RecentScrobbles

A React component that displays a list of recently scrobbled tracks from a Last.fm user profile. It fetches data from the Last.fm API and refreshes automatically every 30 seconds.

## Features

- Displays the 6 most recently played tracks
- Shows album art, track name, and artist name for each entry
- Indicates if a track is currently playing with an animated badge
- Shows a relative timestamp for past tracks (e.g. "3 minutes ago")
- Auto-refreshes in the background without user interaction

## Requirements

- React 18 or later
- A Last.fm API key

## Setup

1. Create a Last.fm API account at [https://www.last.fm/api/account/create](https://www.last.fm/api/account/create) and obtain an API key.

2. Add the API key to your `.env` file:

```
VITE_LASTFM_API_KEY=your_api_key_here
```

3. Set your Last.fm username in the component:

```jsx
const USERNAME = 'your_username';
```

## Usage

```jsx
import RecentScrobbles from './RecentScrobbles';

function App() {
  return <RecentScrobbles />;
}
```

## Styling

The component uses a companion stylesheet, `RecentScrobbles.css`. Import it alongside the component or integrate the styles into your own stylesheet. CSS custom properties are used for colors, making it straightforward to adapt the theme.

Dark mode is supported via `prefers-color-scheme: dark`.

## Notes

- The component renders nothing useful if `VITE_LASTFM_API_KEY` is not set. A warning is logged to the console in that case.
- Album art is fetched at 300x300px resolution (Last.fm `extralarge` size) and displayed at 60x60px, which provides sharp rendering on high-density screens.
- The Last.fm API may return a "now playing" entry without a timestamp. The component handles this by showing the animated badge instead of a time string.