import ArtistsService from '../artists.service';

type GetArtistInput = {
    id: string;
};

export const getArtist = async (_: any, { id }: GetArtistInput) => {
    return await ArtistsService.getArtist(id);
};
