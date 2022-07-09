import { gql } from 'apollo-server-express';

export default gql`
    scalar Void
    
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
        bands: [Band]
        genres: [Genre]
        artists: [Artist]
        tracks: [Track]
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
    
    type Jwt {
        jwt: String
    }
    
    input CreateTrackInput {
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
        tracks: [Track]
        track(id: ID): Track
    }
    
    type Mutation {
        registerUser(input: RegisterUserInput): User
        createArtist(input: ArtistInput): Artist
        deleteArtist(id: ID!): Void
        updateArtist(id: ID, input: ArtistInput): Artist
        createGenre(input: GenreInput): Genre
        deleteGenre(id: ID!): Void
        updateGenre(id: ID, input: GenreInput): Genre
        createTrack(input: CreateTrackInput): Track
    }
`;
