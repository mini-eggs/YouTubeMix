import { h, Component } from "preact";
import "./Playlists.scss";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: props.playlists || [],
      potentialNexItem: null,
      displayModal: false,
      modalStep: 1
    };

    this.renderModal = this.renderModal.bind(this);
  }

  createNewPlaylist(event) {
    event.preventDefault();
    const name = event.target.querySelector("input").value;
    const item = this.state.potentialNexItem;
    this.setState(({ playlists }) => ({
      potentialNexItem: null,
      displayModal: false,
      modalStep: 1,
      playlists: [...playlists, { name, items: [item] }]
    }));
  }

  addItemToPlaylist({ index }) {
    const item = this.state.potentialNexItem;
    this.setState(({ playlists }) => ({
      potentialNexItem: null,
      displayModal: false,
      modalStep: 1,
      playlists: playlists.map((playlist, i) => ({
        name: playlist.name,
        items:
          i === index ? [...(playlist.items || []), item] : playlist.items || []
      }))
    }));
  }

  openCreatePlaylistModal({ item }) {
    this.setState(() => ({
      potentialNexItem: item,
      displayModal: true
    }));
  }

  get childProps() {
    return {
      openCreatePlaylistModal: this.openCreatePlaylistModal.bind(this),
      addItemToPlaylist: this.addItemToPlaylist.bind(this),
      playlists: this.state.playlists
    };
  }

  renderModal() {
    return (
      <div
        onClick={() =>
          this.setState(() => ({ displayModal: false, modalStep: 1 }))
        }
        class="CreatePlaylistModal"
      >
        {this.state.modalStep === 1 && (
          <div onClick={e => e.stopPropagation()}>
            <button onClick={() => this.setState(() => ({ modalStep: 2 }))}>
              Add to new playlist
            </button>
            <button onClick={() => this.setState(() => ({ modalStep: 3 }))}>
              Add to existing playlist
            </button>
          </div>
        )}
        {this.state.modalStep === 2 && (
          <div onClick={e => e.stopPropagation()}>
            <div>
              <div>
                <button
                  class="BackBtn"
                  onClick={() => this.setState(() => ({ modalStep: 1 }))}
                >
                  Back
                </button>
              </div>
              <form
                action="/placeholder"
                onSubmit={e => this.createNewPlaylist(e)}
              >
                <input autofocus={true} placeholder="Playlist name" />
                <button>Create</button>
              </form>
            </div>
          </div>
        )}
        {this.state.modalStep === 3 && (
          <div onClick={e => e.stopPropagation()}>
            <div>
              <div>
                <button
                  class="BackBtn"
                  onClick={() => this.setState(() => ({ modalStep: 1 }))}
                >
                  Back
                </button>
              </div>
              <div class="Playlists-container">
                {this.state.playlists.map((playlist, index) => (
                  <button onClick={() => this.addItemToPlaylist({ index })}>
                    {playlist.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.children.map(fn => fn(this.childProps))}
        {this.state.displayModal && <this.renderModal />}
      </div>
    );
  }
}
