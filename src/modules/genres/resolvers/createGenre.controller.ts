import GenreService from '../genres.service';
import {AppContext} from 'types';

export const createGenre = async (_: any, { input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await GenreService.createGenre(input, token);
};
