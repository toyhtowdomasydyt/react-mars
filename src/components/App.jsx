import React, {Component} from 'react';

import {FetchFromApi} from '../util/FetchFromApi';

import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoDetails: {
        roverName: '',
        camera: '',
        sol: 0
      }
    }
  }

  render() {
    return (
      <div>
        <Search/>
      </div>
    );
  }
}

export default App;
