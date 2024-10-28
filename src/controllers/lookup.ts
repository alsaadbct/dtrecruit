import { Response } from 'express';
import { sendError, sendResponse } from '../utils/helper';
import { prisma } from '../utils/db';
import { validLookupModels } from '../utils/constants';
import { Prisma } from '@prisma/client';

type ModelName = typeof validLookupModels[number];

type FindManyFunction = (args?: Prisma.SelectSubset<any, any>) => Promise<any[]>;

export const lookup = async (req: any, res: Response): Promise<Response> => {
    try {
        const { entity } = req.body;
        if (!validLookupModels.includes(entity)) {
            return sendError(res, 400, `Model ${entity} does not exist.`);
        }
        const model = prisma[entity as ModelName] as unknown as { findMany: FindManyFunction };
        const data = await model.findMany();
        return sendResponse(res, 200, data);
    }
    catch (err) {
        console.error('Error at lookup', err);
        return sendError(res, 500, 'Failed at lookup')
    }
}