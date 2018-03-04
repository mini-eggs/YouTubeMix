import { h } from "preact";
import CreateComposer from "render-prop-composer";

import PlaylistsState from "./containers/Playlists";
import SearchState from "./containers/Search";
import CurrentState from "./containers/Current";
import LocalStorageSeed from "./containers/LocalStorageSeed";
import LocalStorageCache from "./containers/LocalStorageCache";

import Container from "./components/Container";
import SearchHeader from "./components/SearchHeader";
import Playlists from "./components/Playlists";
import List from "./components/List";
import Pillar from "./components/Pillar";
import CurrentSelection from "./components/CurrentSelection";

import "./App.scss";

const StatefulContainer = CreateComposer(h, "div")(
  LocalStorageSeed,
  PlaylistsState,
  SearchState,
  CurrentState,
  LocalStorageCache
);

export default () => (
  <StatefulContainer>
    {props => (
      <div>
        <SearchHeader {...props} />
        <Container>
          <Pillar title="Playlists">
            <Playlists {...props} />
          </Pillar>
          <Pillar title="Search">
            <List {...props} />
          </Pillar>
          <Pillar title="Current">
            <CurrentSelection {...props} />
          </Pillar>
        </Container>
      </div>
    )}
  </StatefulContainer>
);
