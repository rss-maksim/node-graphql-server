import ArtistsService from '../artists.service';
import {AppContext} from 'types';

export const createArtist = async (_: any, { input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await ArtistsService.createArtist(input, token);
};
