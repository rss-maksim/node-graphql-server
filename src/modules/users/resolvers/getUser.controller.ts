import UsersService from '../users.service';

type GetUserInput = {
    id: string;
}

export const getUser = async (_: any, { id }: GetUserInput) => {
    return await UsersService.getUser(id);
};
