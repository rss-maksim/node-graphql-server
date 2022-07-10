import AlbumsService from '../albums.service';

type GetAlbumInput = {
    id: string;
};

export const getAlbum = async (_: any, { id }: GetAlbumInput) => {
    return await AlbumsService.getAlbum(id);
};
