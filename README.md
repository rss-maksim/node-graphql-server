# node-graphql-server

## Steps to have the application run:

1. Download and install [docker](https://docs.docker.com/get-docker)
2. Start mongodb in docker by running command:
`docker run --name mongodb-container -dp 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest`
3. Clone the repo `https://github.com/rolling-scopes-school/node-graphql-service` 
4. In just repo cloned, install dependencies by running`npm i`
5. Run all the services `npm run run:all`
6. Clone repo `https://github.com/rss-maksim/node-graphql-server`
7. Fetch branch `feat/graphql` by running `git fetch origin feat/graphql`
8. Switch to just cloned branch `git checkout feat/graphql`
9. Install all the dependencies by `npm i`
10. Create a file `.env` with content copied from `.env.example`
11. Run `npm run start`
12. Open `http://localhost:8081/graphql` in the browser and run queries/mutations using graphQL UI service (port depends on value `PORT` in the `.env` file)
13. Pay attention that before running mutations you need to get and add jwt token as authorization header (to get jwt token use `getJwt` query after registration): 
`authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM2NzViYTI5OGQzZTQ5ZjBiNDVjZTciLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjlAZ21haWwuY29tIiwiaWF0IjoxNjU3Mzc1NDQ2fQ.VeJMuLNAlMhErnswyu37Xr5_hdllKVlDhxIULmYILAU`
14. Run all the following queries/mutations just copping them and putting into Operation block, and variables into `Variables` block

## Available mutations

### User

#### `registerUser`
```graphql
mutation registerUser($input: RegisterUserInput) {
  registerUser(input: $input) {
    id,
    firstName,
    lastName,
    password,
    email
  }
}
```

Variables:
```
{
  "input": {
   "firstName": "John",
   "lastName": "Smith",
   "email": "john_test1@gmail.com",
   "password": "12345678"
  }
}
```

#### `user`

```graphql
query getUser($id: ID) {
    user(id: $id) {
        id
        firstName
        lastName
        email
        password
    }
}
```

Variables (`id` **should be adjusted!**): 
```
{
 "id": "62c981cd6d2d9a2feb658547"
}
```

#### `jwt`

```graphql
query getJwt($email: String, $password: String) {
  jwt(email: $email, password: $password) {
    jwt
  }
}
```

Variables:
```
{
  "email": "john_test1@gmail.com",
  "password": "12345678"
}
```

### Artist

#### `createArtist`

```graphql
mutation createArtist($input: ArtistInput) {
  createArtist(input: $input) {
    id
    firstName
    secondName
    middleName
    birthDate
    birthPlace
    country
    instruments
    bands {
      id
      name,
      origin
      website,
      genres {
        id
        description
        country
        description
        year
      }
    }
  }
}
```

Variables:
```
{
  "input": {
    "firstName": "firstName",
    "secondName": "secondName",
    "middleName": "middleName",
    "birthDate": "12/02/1992",
    "birthPlace": "birthPlace",
    "country": "country",
    "instruments": ["instrument1", "instrument2"],
    "bands": [{
      "name": "bandName",
      "origin": "origin",
      "members": {
        "artist": "artist",
        "instrument": "instrument",
        "years": ["2022"]
      },
      "website": "band.com",
      "genres": {
        "name": "genreName",
        "description": "genreDescription",
        "country": "genreCountry",
        "year": 2021
      }
    }]
  }
}
```

Variables (`id` should be adjusted accordingly):
```json
{
  "id": "62c9a4f4f81c8f6a96a2a43b"
}
```

#### `updateArtist`
```graphql
mutation updateArtist($id: ID, $input: ArtistInput) {
  updateArtist(id: $id, input: $input) {
    id
    firstName
    secondName
    middleName
    birthDate
    birthPlace
    country
    instruments
    bands {
      id
      name,
      origin
      website,
      genres {
        id
        description
        country
        description
        year
      }
    }
  }
}
```

Variables (`id` should be adjusted accordingly):
```json
{
  "id": "62c9a74ca7357f3e60ac5a2f",
  "input": {
    "firstName": "firstNameUPD",
    "secondName": "secondNameUPD",
    "middleName": "middleNameUPD",
    "birthDate": "12/02/1992",
    "birthPlace": "birthPlaceUPD",
    "country": "countryUPD",
    "instruments": ["instrument3", "instrument4"]
  }
}
```

#### `artist`
```graphql
query getArtist($id: ID!) {
  artist(id: $id) {
    id
    firstName
    secondName
    middleName
    birthDate
    birthPlace
    country
    instruments
  }
}

```

Variables (`id` should be adjusted accordingly):
```json
{
  "id": "62c9a6b3a7357f3e60ac5a2d"
}
```

#### `artists`
```graphql
query getArtists($limit: Int, $offset: Int) {
  artists(limit: $limit, offset: $offset) {
    items {
      id
      firstName
      secondName
      middleName
      birthDate
      birthPlace
      country
      instruments
    }
    limit
    offset
    total
  }
}
```

Variables (optional):
```json
{
  "limit": 10,
  "offset": 0
}
```

#### `deleteArtist`
```graphql
mutation deleteArtist($id: ID!) {
    deleteArtist(id: $id)
}
```

### Genre

#### `createGenre`
```graphql
mutation createGenre($input: GenreInput) {
    createGenre (input: $input) {
        id
        name
        description
        country
        year
    }
}
```

Variables:
```json
{
  "input": {
    "name": "GenreName",
    "description": "GenreDescription",
    "country": "Country",
    "year": 2018
  }
}
```

#### `updateGenre`
```graphql
mutation updateGenre($id: ID, $input: GenreInput) {
  updateGenre(id: $id, input: $input) {
    id
    name
    description
    country
    year
  }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62c9c13c3f35e3ed166f5576",
  "input": {
    "name": "GenreNameUPD",
    "description": "GenreDescriptionUPD",
    "country": "CountryUPD",
    "year": 2019
  }
}
```

#### `genre`

**Query**
```graphql
query genre($id: ID!) {
  genre(id: $id) {
    id
    name
    description
    country
    year
  }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
   "id": "62c9c13c3f35e3ed166f5576"
}
```

#### `genres`

**Query**
```graphql
query genres($limit: Int, $offset: Int) {
  genres(limit: $limit, offset: $offset) {
    items {
      id
      name
      country
      description
    }
    limit
    offset
    total
  }
}
```

**Variables (optional):**
```json
{
   "limit": 10,
   "offset": 0
}
```

#### `deleteGenre`

**Query**
```graphql
mutation deleteGenre($id: ID!) {
  deleteGenre(id: $id)
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
 "id": "62c9c0fa3f35e3ed166f5572"
}
```

### Tracks

#### `createTrack`
```graphql
mutation createTrack($input: TrackInput) {
    createTrack (input: $input) {
        id
        title
        duration
        released
        albums {
            id
            name
        }
        bands {
            id
            name
        }
        genres {
            id
            name
        }
    }
}
```

Variables:
```json
{
  "input": {
    "title": "TrackTitle",
    "duration": 187,
    "released": 2011
  }
}
```

#### `updateTrack`
```graphql
mutation updateTrack($id: ID, $input: TrackInput) {
    updateTrack(id: $id, input: $input) {
        id
        title
        duration
        released
        albums {
            id
            name
        }
        bands {
            id
            name
        }
        genres {
            id
            name
        }
    }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62c67c4f126221edee0e0109",
  "input": {
    "title": "TrackTitleUPD",
    "duration": 188,
    "released": 2012
  }
}
```

#### `track`

**Query**
```graphql
query track($id: ID!) {
    track(id: $id) {
        id
        title
        duration
        released
        albums {
            id
            name
        }
        bands {
            id
            name
        }
        genres {
            id
            name
        }
    }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62c67c4f126221edee0e0109"
}
```

#### `tracks`

**Query**
```graphql
query tracks($limit: Int, $offset: Int) {
    tracks(limit: $limit, offset: $offset) {
        items {
            id
            title
            duration
            released
            albums {
                id
                name
            }
            bands {
                id
                name
            }
            genres {
                id
                name
            }
        }
        limit
        offset
        total
    }
}
```

**Variables (optional):**
```json
{
  "limit": 10,
  "offset": 0
}
```

#### `deleteTrack`

**Query**
```graphql
mutation deleteTrack($id: ID!) {
    deleteTrack(id: $id)
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62c67c4f126221edee0e0109"
}
```

### Bands

#### `createBand`
```graphql
mutation createBand($input: BandInput) {
    createBand(input: $input) {
        id
        name
        origin
        members {
            artist
            instrument
        }
        website
        genres {
            id
            name
        }
    }
}
```

Variables:
```json
{
  "input": {
    "name": "CoolBand",
    "origin": "EN",
    "members": [{
      "artist": "Cool Artist",
      "instrument": "guitar",
      "years": ["1988", "2022"]
    }],
    "website": "coolband.com"
  }
}
```

#### `updateBand`
```graphql
mutation updateBand($id: ID, $input: BandInput) {
    updateBand(id: $id, input: $input) {
        id
        name
        origin
        members {
            artist
            instrument
        }
        website
        genres {
            id
            name
        }
    }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62ca9c1ddfdaff0f78f474fd",
  "input": {
    "name": "CoolBandUPD",
    "origin": "EN_US",
    "members": [{
      "artist": "Cool Artist",
      "instrument": "guitar",
      "years": ["1986", "2022"]
    }],
    "website": "coolband.music"
  }
}
```

#### `band`

**Query**
```graphql
query band($id: ID) {
    band(id: $id) {
        id
        name
        origin
        members {
            artist
            instrument
        }
        website
        genres {
            id
            name
        }
    }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62ca9c1ddfdaff0f78f474fd"
}
```

#### `bands`

**Query**
```graphql
query bands($limit: Int, $offset: Int) {
    bands(limit: $limit, offset: $offset) {
        items {
            id
            name
            origin
            members {
                artist
                instrument
            }
            website
            genres {
                id
                name
            }
        }
        limit
        offset
        total
    }
}
```

**Variables (optional):**
```json
{
  "limit": 10,
  "offset": 0
}
```

#### `deleteBand`

**Query**
```graphql
mutation deleteBand($id: ID!) {
    deleteBand(id: $id)
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62ca9bb7dfdaff0f78f474f9"
}
```

### Albums

#### `createAlbum`
```graphql
mutation createAlbum($input: AlbumInput) {
    createAlbum(input: $input) {
        id
        name
        released
        image
        artists {
            id
            firstName
        }
        genres {
            id
            name
        }
        bands {
            id
            name
        }
        tracks {
            id
            duration
        }
        genres {
            id
            name
        }
    }
}
```

Variables:
```json
{
  "input": {
    "name": "myAlbum",
    "released": 2020,
    "image": "https://image-store.com",
    "artists": [],
    "bands": [],
    "tracks": [],
    "genres": []
  }
}
```

#### `updateAlbum`
```graphql
mutation updateAlbum($id: ID, $input: AlbumInput) {
    updateAlbum(id: $id, input: $input) {
        id
        name
        released
        image
        artists {
            id
            firstName
        }
        genres {
            id
            name
        }
        bands {
            id
            name
        }
        tracks {
            id
            duration
        }
        genres {
            id
            name
        }
    }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62caa1c573612c7dba48b797",
  "input": {
    "name": "myAlbumUPD",
    "released": 2021,
    "image": "https://image-storeUPD.com",
    "artists": [],
    "bands": [],
    "tracks": [],
    "genres": []
  }
}
```

#### `album`

**Query**
```graphql
query album($id: ID) {
    album(id: $id) {
        id
        name
        released
        image
        artists {
            id
            firstName
        }
        genres {
            id
            name
        }
        bands {
            id
            name
        }
        tracks {
            id
            duration
        }
        genres {
            id
            name
        }
    }
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62caa1c573612c7dba48b797"
}
```

#### `albums`

**Query**
```graphql
query albums($limit: Int, $offset: Int) {
    albums(limit: $limit, offset: $offset) {
        items {
            id
            name
            released
            image
            artists {
                id
                firstName
            }
            genres {
                id
                name
            }
            bands {
                id
                name
            }
            tracks {
                id
                duration
            }
            genres {
                id
                name
            }
        }
        limit
        offset
        total
    }
}
```

**Variables (optional):**
```json
{
  "limit": 10,
  "offset": 0
}
```

#### `deleteAlbum`

**Query**
```graphql
mutation deleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
}
```

**Variables (`id` should be adjusted accordingly):**
```json
{
  "id": "62caa1c573612c7dba48b797"
}
```

### Favourites

#### `favourites`

#### `addTrackToFavourites`
**Mutation**
```graphql
mutation addTrackToFavourites($id: ID!) {
    addTrackToFavourites(id: $id) {
        id
        userId
        bandsIds
        genresIds
        artistsIds
        tracksIds
    }
}
```

**Variables (`id` might be adjusted accordingly):**
```json
{
  "id": "12345"
}
```

#### `addBandToFavourites`
**Mutation**

```graphql
mutation addBandToFavourites($id: ID!) {
    addBandToFavourites(id: $id) {
        id
        userId
        bandsIds
        genresIds
        artistsIds
        tracksIds
    }
}
```

**Variables (`id` might be adjusted accordingly):**
```json
{
  "id": "12346"
}
```

#### `addArtistToFavourites`
**Mutation**

```graphql
mutation addArtistToFavourites($id: ID!) {
    addArtistToFavourites(id: $id) {
        id
        userId
        bandsIds
        genresIds
        artistsIds
        tracksIds
    }
}
```

**Variables (`id` might be adjusted accordingly):**
```json
{
  "id": "123467"
}
```

#### `addGenreToFavourites`
**Mutation**

```graphql
mutation addGenreToFavourites($id: ID!) {
    addGenreToFavourites(id: $id) {
        id
        userId
        bandsIds
        genresIds
        artistsIds
        tracksIds
    }
}
```

**Variables (`id` might be adjusted accordingly):**
```json
{
  "id": "1234678"
}
```

**Query**
```graphql
query favourites {
    favourites {
        id
        userId
        bandsIds
        genresIds
        artistsIds
        tracksIds
    }
}
```
