import { Info, RawSattelite, Sattelite } from '@sandbox/types';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import express from 'express';
import * as path from 'path';
import axios from 'axios';
import cors from 'cors';
const INITIAL_VIEW_STATE = {
  latitude: 37.8,
  longitude: -122.45,
  zoom: 15,
};

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());

app.get('/api', (req, res) => {
  axios
    .get<{ info: Info; above: RawSattelite[] }>(
      `https://api.n2yo.com/rest/v1/satellite/above/${INITIAL_VIEW_STATE.latitude}/${INITIAL_VIEW_STATE.longitude}/0/90/52?apiKey=HBA5Q4-2P4PUU-RYAJY5-54HK`
    )
    .then((response) => {
      res.json(
        response.data.above.map<Sattelite>((sattelite) => ({
          id: sattelite.satid,
          lon: sattelite.satlng,
          lat: sattelite.satlat,
          alt: sattelite.satalt,
          name: sattelite.satname,
        }))
      );
    });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
