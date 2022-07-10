import axios from 'axios';
import {UserInputError} from 'apollo-server-express';

import {statusCodes} from '../../const';
import {addQueryParamsToUrl, getEnvVariables, makeAuthHeader} from '../../utils';
import {GenreResponseTransformer} from './utils';
import {NotFoundException} from '../../exceptions';

class GenresService {

    baseUrl: string;
    genreResponseTransformer: GenreResponseTransformer;

    constructor() {
        this.baseUrl = getEnvVariables().GENRES_URL;
        this.genreResponseTransformer = new GenreResponseTransformer();
    }

    async getGenres(params: Record<string, boolean | number | string | null> = {}) {
        const url = addQueryParamsToUrl(this.baseUrl, params);
        try {
            const response = await axios.get(url);
            const items = this.genreResponseTransformer.transformGetGenresResponse(response?.data?.items || []);
            return { ...response?.data, items };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            GenresService.parseServerError(error);
        }
    }

    async getGenre(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404']);
            }
            return this.genreResponseTransformer.transformCreateGenreResponse(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            GenresService.parseServerError(error);
        }
    }

    async createGenre(payload: any, token: string) {
        try {
            const url = `${this.baseUrl}`;
            const response = await axios.post(url, payload, { ...makeAuthHeader(token) });
            return this.genreResponseTransformer.transformCreateGenreResponse(response?.data) || null;
        } catch (error) {
            GenresService.parseServerError(error);
        }
    }

    async deleteGenre(id: string, token: string) {
        try {
            const url = `${this.baseUrl}/${id}`;
            const response = await axios.delete(url, { ...makeAuthHeader(token) });
            return response?.data;
        } catch (error) {
            GenresService.parseServerError(error);
        }
    }

    async updateGenre(id: string, payload: any, token: string) {
        try {
            const url = `${this.baseUrl}/${id}`;
            const response = await axios.put(url, payload, { ...makeAuthHeader(token) });
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404']);
            }

            return this.genreResponseTransformer.transformCreateGenreResponse(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            GenresService.parseServerError(error);
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

export default new GenresService();
