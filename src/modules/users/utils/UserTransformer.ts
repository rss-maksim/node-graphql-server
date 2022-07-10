import {UserApiResponsePayload, UserPayload} from '../types';

export class UserTransformer {
    transformId(user: UserApiResponsePayload): UserPayload {
        const {_id: id, ...rest } = user;
        return { id, ...rest };
    }
}
