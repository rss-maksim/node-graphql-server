import TracksService from '../tracks.service';
import {AppContext} from 'types';

export const createTrack = async (_: any, { input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await TracksService.createTrack(input, token);
};
