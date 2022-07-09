import { getTrack, getTracks, createTrack } from '../modules/tracks/resolvers';
import { registerUser, getUser, getJWT } from '../modules/users/resolvers';
import { createArtist } from '../modules/artists/resolvers';

export const resolvers = {
  Query: {
      user: getUser,
      jwt: getJWT,
      tracks: getTracks,
      track: getTrack
  },
  Mutation: {
      registerUser,
      createArtist,
      createTrack
  }
};
