export class ArtistResponseTransformer {
    transformCreateArtistResponse(artist: any) {
        const {_id: id, ...rest } = artist;
        return { id, ...rest };
    }

    transformGetArtistsResponse(artists: any[]) {
        return artists.map(({_id: id, ...rest }) => ({ id, ...rest }));
    }
}
