import ArtistsService from '../artists.service';
import {AppContext} from 'types';

export const deleteArtist = async (_: any, { id }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await ArtistsService.deleteArtist(id, token);
};
