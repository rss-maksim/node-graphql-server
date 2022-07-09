import {AppContext} from 'types';
import ArtistsService from '../artists.service';

export const updateArtist = async (_: any, { id, input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await ArtistsService.updateArtist(id, input, token);
};
