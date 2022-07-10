import FavouritesService from '../favourites.service';
import {AppContext} from 'types';

type FavouritesInput = {
    id: string;
}

export const addBandToFavourites = async (_: any, { id }: FavouritesInput, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await FavouritesService.addBandToFavourites(id, token);
};
