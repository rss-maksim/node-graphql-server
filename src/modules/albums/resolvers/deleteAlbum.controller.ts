import AlbumsService from '../albums.service';
import {AppContext} from 'types';

export const deleteAlbum = async (_: any, { id }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await AlbumsService.deleteAlbum(id, token);
};
