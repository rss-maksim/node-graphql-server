import axios from 'axios';
import {UserInputError} from 'apollo-server-express';

import {statusCodes} from '../../const';
import {makeAuthHeader} from '../../utils';
import {ArtistResponseTransformer} from './utils';

class ArtistsService {

    baseUrl: string;
    artistResponseTransformer: ArtistResponseTransformer;

    constructor() {
        this.baseUrl = process.env.ARTISTS_URL;
        this.artistResponseTransformer = new ArtistResponseTransformer();
    }

    async createArtist(payload: any, token: string) {
        try {
            const url = `${this.baseUrl}`;
            const response = await axios.post(url, payload, { ...makeAuthHeader(token) });
            const data = this.artistResponseTransformer.transformCreateArtistResponse(response?.data);
            return data;
        } catch (error) {
            console.log(error);
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
