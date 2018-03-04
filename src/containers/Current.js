import { h, Component } from "preact";
import YouTube from "../constants/YouTube";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.currentItem || null
    };
  }

  onCurrentSelect(selected) {
    this.setState(
      () => ({ item: null }),
      () =>
        YouTube.getVideo({ id: selected.id.videoId || selected.id })
          .then(item => this.setState(() => ({ item })))
          .catch(console.log)
    );
  }

  onCurrentClear() {
    this.setState(() => ({ item: null }));
  }

  get childProps() {
    return {
      onCurrentSelect: this.onCurrentSelect.bind(this),
      onCurrentClear: this.onCurrentClear.bind(this),
      currentItem: this.state.item
    };
  }

  render() {
    return <div>{this.props.children.map(fn => fn(this.childProps))}</div>;
  }
}
