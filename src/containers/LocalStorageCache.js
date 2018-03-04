import { h, Component } from "preact";

export default class extends Component {
  componentWillReceiveProps(next) {
    localStorage.setItem("YouTubeMix:LocalStorageCache", JSON.stringify(next));
  }
  render() {
    return <div>{this.props.children.map(fn => fn(this.props))}</div>;
  }
}
