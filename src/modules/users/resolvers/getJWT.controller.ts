import UsersService from '../users.service';

type GetJWTInput = {
    email: string;
    password: string;
}

export const getJWT = async (_: any, { email, password }: GetJWTInput) => {
    return await UsersService.getJWT(email, password);
};
