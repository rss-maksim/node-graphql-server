import TracksService from '../tracks.service';

type GetTrackInput = {
    id: string;
};

export const getTrack = async (_: any, { id }: GetTrackInput) => {
    return await TracksService.getTrack(id);
};
