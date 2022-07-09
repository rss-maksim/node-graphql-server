export const enum Entity {
    bands = 'bands',
    artists = 'artists',
    genres = 'genres',
    tracks = 'tracks'
}

export type FavouriteRequestPayload = {
    type: Entity;
    id: string;
}
