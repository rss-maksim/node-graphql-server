import {UserInputError} from 'apollo-server-express';
import {statusCodes} from '../const';

export const parseServerError = (error: any): never => {
    const statusCode = error?.response?.data?.statusCode;
    const err = error?.response?.data?.error;
    throw new UserInputError(
        err || statusCodes[statusCode],
        error.response.data
    );
};
