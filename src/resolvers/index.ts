import { registerUser, getUser, getJWT } from '../modules/users/resolvers';
import { getArtists, getArtist, createArtist, deleteArtist, updateArtist } from '../modules/artists/resolvers';
import { getGenres, getGenre, createGenre, deleteGenre, updateGenre } from '../modules/genres/resolvers';
import { getTrack, getTracks, createTrack, updateTrack, deleteTrack } from '../modules/tracks/resolvers';
import { getBand, getBands, createBand, updateBand, deleteBand } from '../modules/bands/resolvers';
import { getAlbum, getAlbums, createAlbum, updateAlbum, deleteAlbum } from '../modules/albums/resolvers';
import { getFavourites, addArtistToFavourites, addBandToFavourites, addGenreToFavourites, addTrackToFavourites } from '../modules/favourites/resolvers';

export const resolvers = {
  Query: {
      user: getUser,
      jwt: getJWT,
      artist: getArtist,
      artists: getArtists,
      genre: getGenre,
      genres: getGenres,
      tracks: getTracks,
      track: getTrack,
      bands: getBands,
      band: getBand,
      albums: getAlbums,
      album: getAlbum,
      favourites: getFavourites
  },
  Mutation: {
      registerUser,
      createArtist,
      deleteArtist,
      updateArtist,
      createGenre,
      deleteGenre,
      updateGenre,
      createTrack,
      updateTrack,
      deleteTrack,
      createBand,
      updateBand,
      deleteBand,
      createAlbum,
      updateAlbum,
      deleteAlbum,
      addArtistToFavourites,
      addBandToFavourites,
      addGenreToFavourites,
      addTrackToFavourites
  }
};
