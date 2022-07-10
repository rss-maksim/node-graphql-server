import {AppContext} from 'types';
import GenreService from '../genres.service';

export const updateGenre = async (_: any, { id, input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await GenreService.updateGenre(id, input, token);
};
