import axios from 'axios';
import {UserInputError} from 'apollo-server-express';

import {statusCodes} from '../../const';
import {addQueryParamsToUrl, EntityResponseTransformer, makeAuthHeader, parseServerError} from '../../utils';
import {NotFoundException} from '../../exceptions';

class BandsService {

    baseUrl: string;
    entityResponseTransformer: EntityResponseTransformer;

    constructor() {
        this.baseUrl = process.env.BANDS_URL;
        this.entityResponseTransformer = new EntityResponseTransformer();
    }

    async getBands(params: Record<string, boolean | number | string | null> = {}) {
        const url = addQueryParamsToUrl(this.baseUrl, params);
        try {
            const response = await axios.get(url);
            const items = this.entityResponseTransformer.transformListEntitiesResponse(response?.data?.items || []);
            return { ...response?.data, items };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            parseServerError(error);
        }
    }

    async getBand(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404']);
            }
            return this.entityResponseTransformer.transformEntityResponse(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            parseServerError(error);
        }
    }

    async createBand(payload: any, token: string) {
        try {
            const url = `${this.baseUrl}`;
            const response = await axios.post(url, payload, { ...makeAuthHeader(token) });
            return this.entityResponseTransformer.transformEntityResponse(response?.data) || null;
        } catch (error) {
            parseServerError(error);
        }
    }

    async deleteBand(id: string, token: string) {
        try {
            const url = `${this.baseUrl}/${id}`;
            const response = await axios.delete(url, { ...makeAuthHeader(token) });
            return response?.data;
        } catch (error) {
            parseServerError(error);
        }
    }

    async updateBand(id: string, payload: any, token: string) {
        try {
            const url = `${this.baseUrl}/${id}`;
            const response = await axios.put(url, payload, { ...makeAuthHeader(token) });
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404']);
            }

            return this.entityResponseTransformer.transformEntityResponse(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            parseServerError(error);
        }
    }
}

export default new BandsService();
