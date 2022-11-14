import AlbumsService from '../albums.service';
import {AppContext} from 'types';

export const createAlbum = async (_: any, { input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await AlbumsService.createAlbum(input, token);
};
