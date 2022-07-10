import GenreService from '../genres.service';

type GetGenreInput = {
    id: string;
};

export const getGenre = async (_: any, { id }: GetGenreInput) => {
    return await GenreService.getGenre(id);
};
