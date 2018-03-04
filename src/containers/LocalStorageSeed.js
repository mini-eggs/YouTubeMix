import { h, Component } from "preact";

export default class extends Component {
  constructor(props) {
    super(props);
    let seed;

    try {
      seed = JSON.parse(localStorage.getItem("YouTubeMix:LocalStorageCache"));
    } catch (_) {
      // Silence is bliss.
    }

    this.state = { seed };
  }
  render() {
    return <div>{this.props.children.map(fn => fn(this.state.seed))}</div>;
  }
}
