import BandsService from '../bands.service';

type GetBandInput = {
    id: string;
};

export const getBand = async (_: any, { id }: GetBandInput) => {
    return await BandsService.getBand(id);
};
