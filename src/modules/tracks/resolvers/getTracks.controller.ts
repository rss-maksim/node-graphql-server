import TracksService from '../tracks.service';

type GetTracksInput = {
    limit: number;
    offset: number;
};

export const getTracks = async (_: any, { limit, offset }: GetTracksInput) => {
    return await TracksService.getTracks({ limit, offset });
};
