import { Response } from 'express';

const sendResponse = <T>(res: Response, status: number, data?: T, message?: any) => {
    return res.status(status).json({
        response: data ?? null,
        message: message ?? null
    });
};


const sendError = (res: Response, status: number, message: string, details?: any) => {
    return res.status(status).json({
        error: {
            message,
            details: details ?? null
        }
    });
};

export {
    sendError,
    sendResponse,
};