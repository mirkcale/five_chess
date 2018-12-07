import * as React from 'react';
import Chessboard from './components/chessbord';

import { Provider } from 'react-redux'
import store from './redux/store'
class App extends React.Component {
  public render() {
    return (
      <Provider
        store={store}
      >
        <Chessboard />
      </Provider>

    );
  }
}

export default App;
