import UsersService from '../users.service';

export const registerUser = async (_: any, { input }: any) => {
    return await UsersService.registerUser(input);
};
