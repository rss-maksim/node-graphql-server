import axios from 'axios';
import {UserInputError} from 'apollo-server-express';

import {statusCodes} from '../../const';
import {RegisterUserRequestPayload} from './types';
import {UserTransformer} from './utils/UserTransformer';
import {ForbiddenException, NotFoundException} from '../../exceptions';

class UsersService {

    baseUrl: string;
    userTransformer: UserTransformer;

    constructor() {
        this.baseUrl = process.env.USERS_URL;
        this.userTransformer = new UserTransformer();
    }

    async registerUser(payload: RegisterUserRequestPayload) {
        try {
            const url = `${this.baseUrl}/register`;
            const response = await axios.post(url, payload);
            return this.userTransformer.transformId(response?.data);
        } catch (error) {
            UsersService.parseServerError(error);
        }
    }

    async getUser(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            if (!response?.data) {
                throw new NotFoundException(statusCodes['404'], 404);
            }
            return this.userTransformer.transformId(response?.data) || null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UserInputError(error.message);
            }
            UsersService.parseServerError(error);
        }
    }

    async getJWT(email: string, password: string) {
        const payload = {
            email,
            password
        };
        try {
            const response = await axios.post(`${this.baseUrl}/login`, payload);
            if (!response?.data) {
                throw new ForbiddenException(statusCodes['403'], 403);
            }
            return response?.data;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new UserInputError(error.message);
            }
            UsersService.parseServerError(error);
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

export default new UsersService();
