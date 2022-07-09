import FavouritesService from '../favourites.service';
import {AppContext} from 'types';

type FavouritesInput = {
    id: string;
}

export const addTrackToFavourites = async (_: any, { id }: FavouritesInput, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await FavouritesService.addTrackToFavourites(id, token);
};
