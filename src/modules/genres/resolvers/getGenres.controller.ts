import GenreService from '../genres.service';

type GetGenresInput = {
    limit: number;
    offset: number;
};

export const getGenres = async (_: any, { limit, offset }: GetGenresInput) => {
    return await GenreService.getGenres({ limit, offset });
};
