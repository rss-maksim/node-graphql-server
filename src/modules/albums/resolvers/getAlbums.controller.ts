import AlbumsService from '../albums.service';

type GetAlbumsInput = {
    limit: number;
    offset: number;
};

export const getAlbums = async (_: any, { limit, offset }: GetAlbumsInput) => {
    return await AlbumsService.getAlbums({ limit, offset });
};
