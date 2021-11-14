import React, {Component} from 'react';

import {Container, Box, Grid, Card} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

import {FetchFromApi} from '../util/FetchFromApi';

import Search from './Search';
import Result from './Result';
import RoverInfo from './RoverInfo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoDetails: {
        roverName: '',
        roverCamera: '',
        sol: ''
      },
      resultData: {},
      manifest: {},
      searched: false,
      end: false,
      page: 1
    }

    this.apiKey = process.env.REACT_APP_NASA_API_KEY;
    this.cardTheme = createTheme({
      palette: {
        mode: 'dark'
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.page !== this.state.page) {
      this.loadData();
    }
  }

  handleManifestGet = manifest => {
    this.setState(() => ({manifest}));
  }

  loadData = async () => {
    const {roverName, roverCamera, sol} = this.state.photoDetails;
    const page = this.state.page;

    const data = await FetchFromApi
      .getPhotosByRoverCameraSol(this.apiKey, roverName, roverCamera, sol, page);

    if (data.photos.length === 0) {
      this.setState(() => ({end: true}));
    }

    this.setState(prevState => {
      const prevArray = prevState.resultData.photos || [];

      return {
        resultData: {
          photos: [...prevArray, ...data.photos]
        },
        searched: true
      }
    });
  }

  handleSearch = event => {
    this.setState(() => ({searched: false, end: false, resultData: {}}));

    event.preventDefault();
    const form = event.target;
    const roverName = form.roverSelect.value;
    const roverCamera = form.cameraSelect.value;
    const sol = form.sol.value;

    this.setState(() => ({
      photoDetails: {
        roverName,
        roverCamera,
        sol,
      }
    }), () => this.loadData());
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  }

  render() {
    const {roverName, roverCamera, sol} = this.state.photoDetails;
    const {resultData, manifest, searched, end, page} = this.state;

    return (
      <Container
        sx={{
          padding: '1rem',
          height: '100vh',
          bgcolor: 'transparent'
        }}
      >
        <Box mb={3}>
          <Card>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <ThemeProvider theme={this.cardTheme}>
                <Grid item xs={12} md={6} lg={4} minHeight='280px'>
                  <Box sx={{height: '100%', bgcolor: '#101010'}}>
                    <RoverInfo manifest={manifest}/>
                  </Box>
                </Grid>
              </ThemeProvider>
              <Grid item xs={12} md={6} lg={8}>
                <Search
                  handleSearch={this.handleSearch}
                  handleManifestGet={this.handleManifestGet}
                  searchFields={{roverName, roverCamera, sol}}
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Box paddingBottom={3}>
          <Result
            resultData={resultData.photos || []}
            searched={searched}
            handleLoadMore={this.handleLoadMore}
            endOfData={end}
            page={page}
          />
        </Box>
      </Container>
    );
  }
}

export default App;
