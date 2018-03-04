import { h } from "preact";
import "./Pillar.scss";

export default props => (
  <div class="Pillar">
    <div>
      <h1>{props.title}</h1>
      <div>{props.children}</div>
    </div>
  </div>
);
