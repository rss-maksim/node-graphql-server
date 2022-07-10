import {AppContext} from 'types';
import BandService from '../bands.service';

export const updateBand = async (_: any, { id, input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await BandService.updateBand(id, input, token);
};
