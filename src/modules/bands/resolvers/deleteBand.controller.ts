import BandsService from '../bands.service';
import {AppContext} from 'types';

export const deleteBand = async (_: any, { id }: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    return await BandsService.deleteBand(id, token);
};
