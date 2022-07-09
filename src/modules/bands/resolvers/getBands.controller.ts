import BandsService from '../bands.service';

type GetBandsInput = {
    limit: number;
    offset: number;
};

export const getBands = async (_: any, { limit, offset }: GetBandsInput) => {
    return await BandsService.getBands({ limit, offset });
};
