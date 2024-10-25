import { Response } from 'express';

const sendResponse = <T>(res: Response, status: number, data: T) => {
    return res.status(status).json({ response: data });
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