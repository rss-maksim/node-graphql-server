import TracksService from '../tracks.service';
import {AppContext} from 'types';

export const deleteTrack = async (_: any, { id }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await TracksService.deleteTrack(id, token);
};
