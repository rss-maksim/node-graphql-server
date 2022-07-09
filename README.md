# node-graphql-server

## Steps to have the application run:

1. Download docker from here `https://docs.docker.com/get-docker`
2. Start mongodb in docker by running command:
`docker run --name mongodb-container -dp 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest`
3. Clone the repo `https://github.com/rolling-scopes-school/node-graphql-service` 
4. Install dependencies `npm i` in the repo cloned
5. Run all the services `npm run run:all`
6. Create a file `.env` with content from `.env.example`
7. Run `npm run start`
8. Open `http://localhost:8081/graphql` in the browser and run queries/mutations using graphQL UI
9. Pay attention that before running mutations add jwt token as authorization header (to get jwt token use `getJwt` query after registration): 
`authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM5ODdhNjZkMmQ5YTJmZWI2NTg1NGMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJTbWl0aCIsImVtYWlsIjoiam9obl90ZXN0MUBnbWFpbC5jb20iLCJpYXQiOjE2NTczNzY1MzF9.LrQ0mClPULo_DjFgOPxB12yA4y4Yy7Jrs3CsuT6g1E4`

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

#### `deleteArtist`
```graphql
mutation deleteArtist($id: ID!) {
    deleteArtist(id: $id)
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
