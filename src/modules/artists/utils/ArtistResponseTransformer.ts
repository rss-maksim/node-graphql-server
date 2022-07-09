export class ArtistResponseTransformer {
    transformCreateArtistResponse(artist: any) {
        const {_id: id, ...rest } = artist;
        return { id, ...rest };
    }
}
