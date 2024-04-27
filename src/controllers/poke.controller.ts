import { NextFunction, Request, Response } from "express";
import { PokeService } from "../services/poke.service";
import { UtilHelper } from "../helpers/utils.helper";
import { ByIdRequest, ByPokeRequest, ByUsernameRequest, CreateCatchPokeRequest, CreateRenamePokeRequest } from "../models/poke.model";

export class PokeController {
    static async loginWithUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body as ByUsernameRequest;

            const response = await PokeService.loginUsername(payload);

            return res.status(200).json({
                statusCode: 200,
                message: 'Successfully',
                data: response
            })

        } catch (error) {
            next(error)
        }
    }

    static async renamePoke(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body as CreateRenamePokeRequest;

            const response = await PokeService.renamePoke(payload);

            return res.status(200).json({
                statusCode: 200,
                message: '"Success updated name poke!"',
                data: response
            })

        } catch (error) {
            next(error)
        }
    }

    static async getPokeController(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await PokeService.getPoke();

            return res.status(200).json({
                statusCode: 200,
                message: 'Successfully',
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getDetailPokeController(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.params as ByPokeRequest;           

            const response = await PokeService.detailPoke(payload);

            return res.status(200).json({
                statusCode: 200,
                message: 'Successfully',
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async catchProbability(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body as CreateCatchPokeRequest;

            const response = await PokeService.catchProbability(payload)
            
            return res.status(200).json({
                statusCode: 200,
                message: 'Successfully',
                data: response
            })
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }

    static async releasePoke(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body as ByIdRequest;

            const generateNumber = UtilHelper.generateRangeNumber(1, 10);
            const prime = UtilHelper.checkIsPrime(generateNumber);

            if(prime) await PokeService.releasePoke(payload)

            return res.status(200).json({
                statusCode: 200,
                message: 'Successfully',
                data: {
                    number: generateNumber,
                    isPrime: prime
                }
            })
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }

}