import axios from 'axios';

type TrackArguments = {
    id: string;
}

export const getTrack = async (_: any, { id }: TrackArguments) => {
    try {
        const response = await axios.get(`${process.env.TRACKS_URL}/${id}`);
        return response?.data || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
