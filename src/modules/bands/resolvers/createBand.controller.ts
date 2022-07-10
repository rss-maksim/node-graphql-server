import BandsService from '../bands.service';
import {AppContext} from 'types';

export const createBand = async (_: any, { input }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await BandsService.createBand(input, token);
};
