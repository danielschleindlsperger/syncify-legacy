import * as SpotifyWebApi from 'spotify-web-api-node';
import { construct } from 'ramda';

const makeInstance = construct(SpotifyWebApi);
export const spotify = accessToken => makeInstance({ accessToken });
