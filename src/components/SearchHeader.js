import { h, Component } from "preact";
import "./SearchHeader.scss";

export default ({ onSearchInput }) => (
  <div class="SearchHeader-container">
    <div class="SearchHeader">
      <h1>YouTubeMix</h1>
      <div>
        <input onInput={onSearchInput} placeholder="Try 'Tech'" />
      </div>
    </div>
    <div class="spacer" />
  </div>
);
