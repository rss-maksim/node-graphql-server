export const makeAuthHeader = (token: string) => {
    return {
        headers: {
            'authorization': `Bearer ${token}`
        }
    };
};
