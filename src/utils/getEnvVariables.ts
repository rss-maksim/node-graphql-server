import dotenv from 'dotenv';

dotenv.config();

export const getEnvVariables = () => {
    return process.env;
};
