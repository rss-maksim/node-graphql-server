import { getTrack, getTracks, createTrack } from '../modules/tracks/resolvers';
import { registerUser, getUser, getJWT } from '../modules/users/resolvers';
import { getArtists, getArtist, createArtist, deleteArtist, updateArtist } from '../modules/artists/resolvers';
import { getGenres, getGenre, createGenre, deleteGenre, updateGenre } from '../modules/genres/resolvers';

export const resolvers = {
  Query: {
      user: getUser,
      jwt: getJWT,
      artist: getArtist,
      artists: getArtists,
      genre: getGenre,
      genres: getGenres,
      tracks: getTracks,
      track: getTrack
  },
  Mutation: {
      registerUser,
      createArtist,
      deleteArtist,
      updateArtist,
      createGenre,
      deleteGenre,
      updateGenre,
      createTrack
  }
};
