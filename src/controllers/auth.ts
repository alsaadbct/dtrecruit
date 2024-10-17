import { Request, Response } from 'express';
import {validationResult} from 'express-validator';

export const login = async (req : Request, res : Response) : Promise<Response> => {
    console.log('entered')
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array(),
        })
    }
    return res.status(200).json("API Success");
}