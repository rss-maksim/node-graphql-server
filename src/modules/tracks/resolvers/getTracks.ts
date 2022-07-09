import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const getTracks = async () => {
    const response = await axios.get(process.env.TRACKS_URL);
    return response.data.items;
};
