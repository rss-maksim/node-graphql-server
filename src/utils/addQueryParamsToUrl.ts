export const addQueryParamsToUrl = (url: string, params = {}): string => {
    let nextUrl = url;
    const query = Object
        .entries(params)
        .filter(([, value]) => typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    if (query) {
        nextUrl += `?${query}`;
    }
    return nextUrl;
};
