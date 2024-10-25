import { Response } from 'express';
import { sendError, sendResponse } from '../utils/helper';
import { prisma } from '../utils/db';
import { validLookupModels } from '../utils/constants';

type ModelName = typeof validLookupModels[number];

function isModelWithFindMany(model: any): model is { findMany: Function } {
    return typeof model?.findMany === 'function';
}

export const lookup = async (req: any, res: Response): Promise<Response> => {
    try {
        const { entity } = req.body;
        if (!validLookupModels.includes(entity)) {
            return sendError(res, 400, `Model ${entity} does not exist.`);
        }
        const model = prisma[entity as ModelName];
        if (!isModelWithFindMany(model)) {
            return sendError(res, 400, `Model ${entity} does not support findMany operation.`);
        }
        const data = await model.findMany();
        return sendResponse(res, 200, data)
    }
    catch (err) {
        console.error('Error at login', err);
        return sendError(res, 500, 'Failed at lookup')
    }
}