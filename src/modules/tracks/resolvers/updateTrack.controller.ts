import {AppContext} from 'types';
import TracksService from '../tracks.service';

export const updateTrack = async (_: any, { id, input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await TracksService.updateTrack(id, input, token);
};
