import FavouritesService from '../favourites.service';
import {AppContext} from 'types';

export const getFavourites = async (_: any, __: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await FavouritesService.getFavourites(token);
};
