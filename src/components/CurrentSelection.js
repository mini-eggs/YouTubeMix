import { h } from "preact";
import "./CurrentSelection.scss";

const IFrame = ({ id }) => (
  <div class="iframe-container">
    <iframe
      src={`https://www.youtube.com/embed/${id}?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1`}
      frameborder="0"
      allow="autoplay; encrypted-media"
    />
  </div>
);

export default ({ currentItem, openCreatePlaylistModal }) => {
  if (!currentItem) {
    return null;
  }

  return (
    <div class="CurrentSelection">
      <div>
        {/* <img src={currentItem.snippet.thumbnails.high.url} /> */}
        <IFrame {...currentItem} />
      </div>
      <div class="btn-container">
        <button onClick={() => openCreatePlaylistModal({ item: currentItem })}>
          Add
        </button>
      </div>
      <h1 class="CurrentSelection-title">{currentItem.snippet.title}</h1>
      <p>{currentItem.snippet.description}</p>
    </div>
  );
};
