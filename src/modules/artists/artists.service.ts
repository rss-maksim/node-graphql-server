import axios from 'axios';
import {UserInputError} from 'apollo-server-express';

import {statusCodes} from '../../const';
import {addQueryParamsToUrl, makeAuthHeader} from '../../utils';
import {ArtistResponseTransformer} from './utils';
import {NotFoundException} from '../../exceptions';

class ArtistsService {

    baseUrl: string;
    artistResponseTransformer: ArtistResponseTransformer;

    constructor() {
        this.baseUrl = process.env.ARTISTS_URL;
        this.artistResponseTransformer = new ArtistResponseTransformer();
    }

    async getArtists(params: Record<string, boolean | number | string | null> = {}) {
        const url = addQueryParamsToUrl(this.baseUrl, params);
        try {
            const response = await axios.get(url);
            const items = this.artistResponseTransformer.transformGetArtistsResponse(response?.data?.items || []);
            return { ...response?.data, items };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            ArtistsService.parseServerError(error);
        }
    }

    async getArtist(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404']);
            }
            return this.artistResponseTransformer.transformCreateArtistResponse(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            ArtistsService.parseServerError(error);
        }
    }

    async createArtist(payload: any, token: string) {
        try {
            const url = `${this.baseUrl}`;
            const response = await axios.post(url, payload, { ...makeAuthHeader(token) });
            return this.artistResponseTransformer.transformCreateArtistResponse(response?.data) || null;
        } catch (error) {
            ArtistsService.parseServerError(error);
        }
    }

    async deleteArtist(id: string, token: string) {
        try {
            const url = `${this.baseUrl}/${id}`;
            const response = await axios.delete(url, { ...makeAuthHeader(token) });
            return response?.data;
        } catch (error) {
            ArtistsService.parseServerError(error);
        }
    }

    async updateArtist(id: string, payload: any, token: string) {
        try {
            const url = `${this.baseUrl}/${id}`;
            const response = await axios.put(url, payload, { ...makeAuthHeader(token) });
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404']);
            }

            return this.artistResponseTransformer.transformCreateArtistResponse(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            ArtistsService.parseServerError(error);
        }
    }

    private static parseServerError(error: any): never {
        const statusCode = error?.response?.data?.statusCode;
        const err = error?.response?.data?.error;
        throw new UserInputError(
            err || statusCodes[statusCode],
            error.response.data
        );
    }
}

export default new ArtistsService();
