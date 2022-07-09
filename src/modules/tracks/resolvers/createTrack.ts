import axios from 'axios';
import {AppContext} from 'types';

export const createTrack = async (_: any, {input}: any, { token }: AppContext) => {
    if (!token) {
        return;
    }
    try {
        const response = await axios.post(process.env.TRACKS_URL, input, {
            headers: {
                'authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.data;
    }
};
