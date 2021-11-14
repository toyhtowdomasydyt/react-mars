import axios from 'axios';

export class FetchFromApi {
  static uri = {
    baseReqUri: 'https://api.nasa.gov/mars-photos/api/v1/',
    reqPhotosStart: 'rovers/',
    reqManifestStart: 'manifests/',
    reqEnd: `api_key=`,
  }

  static async getMissionManifest(apiKey, roverName) {
    const {baseReqUri, reqManifestStart, reqEnd} = this.uri;
    const fullReq = `${baseReqUri}${reqManifestStart}${roverName}/?${reqEnd}${apiKey}`;
    const response = await axios.get(fullReq);

    return await response.data;
  }

  static async getPhotosByRoverCameraSol(apiKey, roverName, camera, sol, page = 1) {
    const {baseReqUri, reqPhotosStart, reqEnd} = this.uri;
    const fullReq = `${baseReqUri}${reqPhotosStart}${roverName}/photos?sol=${sol}&camera=${camera}&page=${page}&${reqEnd}${apiKey}`;
    const response = await axios.get(fullReq);

    return response.data;
  }
}
