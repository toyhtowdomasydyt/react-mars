import React, {Component} from 'react';

import {Box, InputLabel, MenuItem, FormControl, Select, TextField, Button} from '@mui/material';

import {FetchFromApi} from '../util/FetchFromApi';

import {allRovers} from "../data/allRovers";
import {roverCamerasInfo} from "../data/roversCamerasInfo";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allRovers: [...allRovers],
      roverCameras: [],
      roverName: this.props.searchFields.roverName,
      roverCamera: this.props.searchFields.roverCamera,
      sol: this.props.searchFields.sol,
      solMax: 0
    }

    this.apiKey = process.env.REACT_APP_NASA_API_KEY;
    this.handleSearch = this.props.handleSearch;
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
    const {allRovers, roverCameras, roverName, roverCamera, solMax, sol} = this.state;

    return (
      <form onSubmit={this.handleSearch}>
        <Box sx={{minWidth: 120, mt: 3}}>
          <FormControl fullWidth sx={{mb: 5}}>
            <InputLabel id='rover-select'>Rovers</InputLabel>
            <Select
              name='roverSelect'
              labelId='rover-select'
              value={roverName}
              label='Rovers'
              onChange={this.handleRoverSelectChange}
            >
              {allRovers.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            disabled={roverCameras.length === 0}
            sx={{mb: 5}}
          >
            <InputLabel id='camera-select'>Cameras</InputLabel>
            <Select
              name='cameraSelect'
              labelId='camera-select'
              value={roverCamera}
              label='Cameras'
              onChange={this.handleCameraSelectChange}
            >
              {roverCameras.map((item) => (
                <MenuItem key={item.abbr} value={item.abbr}>{item.fullName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="sol"
            name='sol'
            label="Sol"
            variant="outlined"
            value={sol}
            onChange={this.handleSolChange}
            inputProps={{ inputMode: 'numeric', min: 0, max: solMax}}
          />
          <Button variant="contained" type='submit'>Search</Button>
        </Box>
      </form>
    );
  }
}

export default Search;
