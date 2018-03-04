import { h, Component } from "preact";
import YouTube from "../constants/YouTube";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.searchItems || []
    };
  }

  onSearchSelect(item) {
    window.scrollTo(0, 0);
  }

  onSearchInput(event) {
    this.setState(() => ({
      items: []
    }));

    if (event.target.value === "") {
      return;
    }

    YouTube.search({ q: event.target.value })
      .then(res => this.setState(() => ({ items: res })))
      .catch(console.log);
  }

  get childProps() {
    return {
      onSearchSelect: this.onSearchSelect.bind(this),
      onSearchInput: this.onSearchInput.bind(this),
      searchItems: this.state.items
    };
  }

  render() {
    return <div>{this.props.children.map(fn => fn(this.childProps))}</div>;
  }
}
