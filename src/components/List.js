import { h } from "preact";
import "./List.scss";

export default ({ searchItems, onSearchSelect, onCurrentSelect }) => {
  const onClick = item => () => {
    onSearchSelect(item);
    onCurrentSelect(item);
  };

  return (
    <div class="List">
      {searchItems.map((item, index) => {
        return (
          <button key={index} onClick={onClick(item)}>
            <div class="Image-container">
              <img src={item.snippet.thumbnails.high.url} />
            </div>
            <div>{item.snippet.title}</div>
          </button>
        );
      })}
    </div>
  );
};
