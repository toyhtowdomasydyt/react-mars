import React, {Component} from 'react';

import {FormControl, TextField, Button, Box} from '@mui/material';
import BasicSelect from './BasicSelect';

import {FetchFromApi} from '../util/FetchFromApi';

import {allRovers} from "../data/allRovers";
import {roverCamerasInfo} from "../data/roversCamerasInfo";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allRovers: [...allRovers],
      roverCameras: [],
      roverName: props.searchFields.roverName,
      roverCamera: props.searchFields.roverCamera,
      sol: props.searchFields.sol,
      solMax: 0,
    }

    this.apiKey = process.env.REACT_APP_NASA_API_KEY;
    this.handleSearch = props.handleSearch;
    this.handleManifestGet = props.handleManifestGet;
  }

  handleRoverSelectChange = async (event) => {
    const roverName = event.target.value;
    const cameras = roverCamerasInfo.filter(item => item.rovers.includes(roverName));

    this.setState(() => (
      {
        roverName: roverName,
        roverCameras: [...cameras]
      }
    ));

    const manifest = await FetchFromApi.getMissionManifest(this.apiKey, roverName);

    this.handleManifestGet(manifest.photo_manifest);

    this.setState(() => (
      {
        solMax: manifest.photo_manifest.max_sol,
        sol: manifest.photo_manifest.max_sol
      }
    ));
  };

  handleCameraSelectChange = event => {
    this.setState(() => (
      {roverCamera: event.target.value}
    ));
  };

  handleSolChange = event => {
    const value = event.target.value;

    if (!isNaN(value)) {
      this.setState(() => (
        {sol: +value}
      ));
    }
  };

  render() {
    const {allRovers, roverCameras, roverName, roverCamera, sol} = this.state;

    return (
      <Box padding={3}>
        <form onSubmit={this.handleSearch}>
          <FormControl fullWidth sx={{mb: 3}}>
            <BasicSelect
              value={roverName}
              label='Rover'
              name='roverSelect'
              id='roverSelect'
              handleChange={this.handleRoverSelectChange}
              options={allRovers.map(item => ({'abbr': item, 'fullName': item}))}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{mb: 3}}
            disabled={roverCameras.length === 0}
          >
            <BasicSelect
              value={roverCamera}
              label='Camera'
              name='cameraSelect'
              id='cameraSelect'
              handleChange={this.handleCameraSelectChange}
              options={roverCameras}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{mb: 3}}
          >
            <TextField
              disabled={roverCameras.length === 0}
              id="sol"
              name='sol'
              label="Sol"
              variant="outlined"
              value={sol}
              onChange={this.handleSolChange}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            type='submit'
          >
            Search
          </Button>
        </form>
      </Box>
    );
  }
}

export default Search;
