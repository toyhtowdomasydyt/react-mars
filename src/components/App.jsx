import React, {Component} from 'react';

import {FetchFromApi} from '../util/FetchFromApi';

import Search from './Search';
import Result from './Result';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoDetails: {
        roverName: '',
        roverCamera: '',
        sol: 0
      },
      resultData: {}
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
      resultData: {
        ...data
      }
    }));
  }

  render() {
    const {roverName, roverCamera, sol} = this.state.photoDetails;
    const {resultData} = this.state;

    return (
      <div>
        <Search
          handleSearch={this.handleSearch}
          searchFields={{roverName, roverCamera, sol}}
        />
        <Result
          resultData={resultData.photos || []}
        />
      </div>
    );
  }
}

export default App;
