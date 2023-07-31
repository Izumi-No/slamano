import { HttpResponse } from "./httpResponse";

type errorType = {
    error: string;
}

export class HttpHelper {
    static ok<T>(dto?: T): HttpResponse<T> {
        return {
            statusCode: 200,
            body: dto,
        };
    }

    static created(): HttpResponse<undefined> {
        return {
            statusCode: 201,
            body: undefined,
        };
    }

    static clientError(error: Error): HttpResponse<errorType> {
        return {
            statusCode: 400,
            body: {
                error: error.message,
            },
        };
    }

    static unauthorized(error: Error): HttpResponse<errorType> {
        return {
            statusCode: 401,
            body: {
                error: error.message,
            },
        };
    }

    static forbidden(error: Error): HttpResponse<errorType> {
        return {
            statusCode: 403,
            body: {
                error: error.message,
            },
        };
    }

    static notFound(error: Error): HttpResponse<errorType> {
        return {
            statusCode: 404,
            body: {
                error: error.message,
            },
        };
    }

    static conflict(error: Error): HttpResponse<errorType> {
        return {
            statusCode: 409,
            body: {
                error: error.message,
            },
        };
    }

    static tooMany(error: Error): HttpResponse<errorType> {
        return {
            statusCode: 429,
            body: {
                error: error.message,
            },
        };
    }

    static fail(error: Error): HttpResponse<errorType> {
        console.log(error);

        return {
            statusCode: 500,
            body: {
                error: error.message,
            },
        };
    }
}