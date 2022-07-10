import {AppContext} from 'types';
import AlbumsService from '../albums.service';

export const updateAlbum = async (_: any, { id, input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await AlbumsService.updateAlbum(id, input, token);
};
