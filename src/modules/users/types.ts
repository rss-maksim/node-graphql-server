export type RegisterUserRequestPayload = {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export type UserApiResponsePayload = {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    __v?: number;
}

export type UserPayload = {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}
