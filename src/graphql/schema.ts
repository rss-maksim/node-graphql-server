import { gql } from 'apollo-server-express';

export default gql`
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

    type Query {
        user(id: ID): User
        jwt(email: String, password: String): Jwt
        tracks: [Track]
        track(id: ID): Track
        genres: [Genre]
        artists: [Artist]
    }
    
    type Mutation {
        registerUser(input: RegisterUserInput): User
        createArtist(input: ArtistInput): Artist
        createTrack(input: CreateTrackInput): Track
    }
`;
