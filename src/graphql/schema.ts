import { gql } from 'apollo-server-express';

export default gql`
    scalar Void

    type Pagination {
        limit: String
        offset: String
        total: Int
    }
    
    type Member {
        artist: String!
        instrument: String!
        years: [String]!
    }
    
    type Artist {
        id: ID!
        firstName: String
        secondName: String
        middleName: String
        birthDate: String
        birthPlace: String
        country: String
        bands: [Band]
        instruments: [String]
    }
    
    type ArtistsWithPagination {
        items: [Artist]
        limit: String
        offset: String
        total: Int
    }
    
    type GenresWithPagination {
        items: [Genre]
        limit: String
        offset: String
        total: Int
    }
    
    type Band {
        id: ID!
        name: String
        origin: String
        members: [Member]
        website: String
        genres: [Genre]
    }
    
    type BandWithPagination {
        items: [Band]
        limit: String
        offset: String
        total: Int   
    }
    
    type Genre {
        id: ID!
        name: String
        description: String
        country: String
        year: Int
    }
    
    type Favourites {
        id: ID!
        userId: ID
        bandsIds: [String]
        genresIds: [String]
        artistsIds: [String]
        tracksIds: [String]
    }
    
    type Album {
        id: ID!
        name: String
        released: Int
        artists: [Artist]
        bands: [Band]
        tracks: [Track]
        genres: [Genre]
        image: String
    }
    
    type AlbumWithPagination {
        items: [Album]
        limit: String
        offset: String
        total: Int
    }
    
    input AlbumInput {
        name: String
        released: Int
        artists: [ArtistInput]
        bands: [BandInput]
        tracks: [TrackInput]
        genres: [GenreInput]
        image: String
    }
    
    type User {
        id: ID!
        firstName: String
        lastName: String
        password: String
        email: String!
    }
    
    type Track {
        id: ID
        title: String!
        albums: [Album]
        bands: [Band]
        duration: Int
        released: Int
        genres: [Genre]
    }
    
    type TrackWithPagination {
        items: [Track]
        limit: String
        offset: String
        total: Int
    }
    
    type Jwt {
        jwt: String
    }
    
    input TrackInput {
        title: String!
        duration: Int
        released: Int
        albumId: ID
        bandsIds: [ID]
        artistsIds: [ID]
        genresIds: [ID]
    }
    
    input RegisterUserInput {
        firstName: String
        lastName: String
        password: String
        email: String!
    }
    
    input GenreInput {
        name: String
        description: String
        country: String
        year: Int
    }
    
    input MemberInput {
        artist: String!
        instrument: String!
        years: [String]!
    }
    
    input BandInput {
        name: String
        origin: String
        members: [MemberInput]
        website: String
        genres: [GenreInput]
    }
    
    input ArtistInput {
        firstName: String
        secondName: String
        middleName: String
        birthDate: String
        birthPlace: String
        country: String
        instruments: [String]
        bands: [BandInput]
    }
    
    input GenreInput {
        name: String
        description: String
        country: String
        year: Int
    }

    type Query {
        user(id: ID): User
        jwt(email: String, password: String): Jwt
        artists(limit: Int, offset: Int): ArtistsWithPagination
        artist(id: ID!): Artist
        genres(limit: Int, offset: Int): GenresWithPagination
        genre(id: ID!): Genre
        tracks(limit: Int, offset: Int): TrackWithPagination
        track(id: ID): Track
        bands(limit: Int, offset: Int): BandWithPagination
        band(id: ID): Band
        albums(limit: Int, offset: Int): AlbumWithPagination
        album(id: ID): Album
        favourites: Favourites
    }
    
    type Mutation {
        registerUser(input: RegisterUserInput): User
        createArtist(input: ArtistInput): Artist
        deleteArtist(id: ID!): Void
        updateArtist(id: ID, input: ArtistInput): Artist
        createGenre(input: GenreInput): Genre
        deleteGenre(id: ID!): Void
        updateGenre(id: ID, input: GenreInput): Genre
        createTrack(input: TrackInput): Track
        updateTrack(id: ID, input: TrackInput): Track
        deleteTrack(id: ID!): Void
        createBand(input: BandInput): Band
        updateBand(id: ID, input: BandInput): Band
        deleteBand(id: ID!): Void
        createAlbum(input: AlbumInput): Album
        updateAlbum(id: ID, input: AlbumInput): Album
        deleteAlbum(id: ID!): Void
        addTrackToFavourites(id: ID!): Favourites
        addBandToFavourites(id: ID!): Favourites
        addArtistToFavourites(id: ID!): Favourites
        addGenreToFavourites(id: ID!): Favourites
    }
`;
