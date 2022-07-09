import FavouritesService from '../favourites.service';
import {AppContext} from 'types';

type FavouritesInput = {
    id: string;
}

export const addArtistToFavourites = async (_: any, { id }: FavouritesInput, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await FavouritesService.addArtistToFavourites(id, token);
};
