import React, {Component} from 'react';

import {FetchFromApi} from '../util/FetchFromApi';

import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoDetails: {
        roverName: '',
        roverCamera: '',
        sol: 0
      },
      searchData: {}
    }

    this.apiKey = process.env.REACT_APP_NASA_API_KEY;
  }

  handleSearch = async event=> {
    event.preventDefault();
    const form = event.target;
    const roverName = form.roverSelect.value;
    const roverCamera = form.cameraSelect.value;
    const sol = form.sol.value;

    const data = await FetchFromApi
      .getPhotosByRoverCameraSol(this.apiKey, roverName, roverCamera, sol);

    this.setState(() => ({
      photoDetails: {
        roverName,
        roverCamera,
        sol,
      },
      searchData: {
        ...data
      }
    }), () => console.log(this.state.searchData));
  }

  render() {
    const {roverName, roverCamera, sol} = this.state.photoDetails;

    return (
      <div>
        <Search
          handleSearch={this.handleSearch}
          searchFields={{roverName, roverCamera, sol}}
        />
      </div>
    );
  }
}

export default App;
