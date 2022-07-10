export class GenreResponseTransformer {
    transformCreateGenreResponse(genre: any) {
        const {_id: id, ...rest } = genre;
        return { id, ...rest };
    }

    transformGetGenresResponse(genres: any[]) {
        return genres.map(({_id: id, ...rest }) => ({ id, ...rest }));
    }
}
