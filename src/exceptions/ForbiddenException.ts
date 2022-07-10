export class ForbiddenException extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 403) {
        super(message);
        this.statusCode = statusCode;
    }
}
