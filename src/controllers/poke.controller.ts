import { NextFunction, Request, Response } from "express";
import { PokeService } from "../services/poke.service";
import { UtilHelper } from "../helpers/utils.helper";
import createHttpError from "http-errors";

export class PokeController {
    static async loginWithUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.body;
            if(username?.length < 1 || !username) createHttpError.BadRequest("Username required!");

            const response = await PokeService.loginUsername(username);

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
            const { id, name } = req.body;

            const response = await PokeService.renamePoke({ id, name });

            return res.status(200).json({
                statusCode: 200,
                message: 'Successfully',
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
            const { poke } = req.params;

            const response = await PokeService.detailPoke(poke);

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
            const { username, poke } = req.body

            const response = await PokeService.catchProbability({ username, poke })
            
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
            const { id } = req.body;

            const generateNumber = UtilHelper.generateRangeNumber(1, 1000);
            const prime = UtilHelper.checkIsPrime(generateNumber);

            if(prime) await PokeService.releasePoke(Number(id))

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