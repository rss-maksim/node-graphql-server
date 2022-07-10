import GenreService from '../genres.service';
import {AppContext} from 'types';

export const deleteGenre = async (_: any, { id }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await GenreService.deleteGenre(id, token);
};
