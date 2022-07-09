import axios from 'axios';
import {UserInputError} from 'apollo-server-express';

import {statusCodes} from '../../const';
import {EntityResponseTransformer, makeAuthHeader, parseServerError} from '../../utils';
import {ForbiddenException} from '../../exceptions';
import {Entity, FavouriteRequestPayload} from './types';

class FavouritesService {

    baseUrl: string;
    entityResponseTransformer: EntityResponseTransformer;

    constructor() {
        this.baseUrl = process.env.FAVOURITES_URL;
        this.entityResponseTransformer = new EntityResponseTransformer();
    }

    async getFavourites() {
        try {
            const response = await axios.get(this.baseUrl);
            if (!response?.data) {
                throw new ForbiddenException(statusCodes['403']);
            }
            return this.entityResponseTransformer.transformEntityResponse(response?.data);
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new UserInputError(error.message);
            }
            parseServerError(error);
        }
    }

    async addToFavourites(payload: FavouriteRequestPayload, token: string) {
        try {
            const url = `${this.baseUrl}/add`;
            const response = await axios.post(url, payload, { ...makeAuthHeader(token) });
            if (!response?.data) {
                throw new ForbiddenException(statusCodes['403']);
            }
            return this.entityResponseTransformer.transformEntityResponse(response?.data);
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new UserInputError(error.message);
            }
            parseServerError(error);
        }
    }

    async removeFromFavourites(payload: FavouriteRequestPayload, token: string) {
        try {
            const url = `${this.baseUrl}/remove`;
            const response = await axios.post(url, payload, { ...makeAuthHeader(token) });
            if (!response?.data) {
                throw new ForbiddenException(statusCodes['403']);
            }
            return this.entityResponseTransformer.transformEntityResponse(response?.data);
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new UserInputError(error.message);
            }
            parseServerError(error);
        }
    }

    async addTrackToFavourites(id: string, token: string) {
        return await this.addToFavourites({ type: Entity.tracks, id }, token);
    }

    async addBandToFavourites(id: string, token: string) {
        return await this.addToFavourites({ type: Entity.bands, id }, token);
    }

    async addArtistToFavourites(id: string, token: string) {
        return await this.addToFavourites({ type: Entity.artists, id }, token);
    }

    async addGenreToFavourites(id: string, token: string) {
        return await this.addToFavourites({ type: Entity.genres, id }, token);
    }

    async removeTrackFromFavourites(id: string, token: string) {
        return await this.removeFromFavourites({ type: Entity.tracks, id }, token);
    }

    async removeBandFromFavourites(id: string, token: string) {
        return await this.removeFromFavourites({ type: Entity.bands, id }, token);
    }

    async removeArtistFromFavourites(id: string, token: string) {
        return await this.removeFromFavourites({ type: Entity.artists, id }, token);
    }

    async removeGenreFromFavourites(id: string, token: string) {
        return await this.removeFromFavourites({ type: Entity.genres, id }, token);
    }
}

export default new FavouritesService();
