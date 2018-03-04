import { h } from "preact";
import "./Playlists.scss";

export default ({ playlists, onCurrentSelect }) => (
  <div class="Playlists">
    {playlists.map(playlist => (
      <div>
        <h1>{playlist.name}</h1>
        {playlist.items.map(video => (
          <button onClick={() => onCurrentSelect(video)}>
            {video.snippet.title}
          </button>
        ))}
      </div>
    ))}
  </div>
);
