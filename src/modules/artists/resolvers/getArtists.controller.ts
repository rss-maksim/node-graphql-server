import ArtistsService from '../artists.service';

type GetArtistsInput = {
    limit: number;
    offset: number;
};

export const getArtists = async (_: any, { limit, offset }: GetArtistsInput) => {
    return await ArtistsService.getArtists({ limit, offset });
};
