import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { PokemonClient } from "pokenode-ts";
import { UtilHelper } from "../helpers/utils.helper";
import { Validation } from "../validations/validation";
import { ByIdRequest, ByPokeRequest, ByUsernameRequest, CreateCatchPokeRequest, CreateRenamePokeRequest } from "../models/poke.model";
import { PokeValidation } from "../validations/poke.validation";
import { ResponseError } from "../helpers/error_response.helper";

const prisma = new PrismaClient();
const P = new PokemonClient();

export class PokeService {
  static async loginUsername(payload: ByUsernameRequest) {
    const validation = Validation.validate(PokeValidation.BY_USERNAME, payload)

    let user = await prisma.user.findUnique({
      where: validation,
      include: { pokemons: { where: { deletedAt: null } } },
    });

    if (!user) {
      user = await prisma.user.create({
        data: validation,
        include: { pokemons: true },
      });
    }

    return user;
  }

  static async renamePoke(payload: CreateRenamePokeRequest) {
    const { id, name } = Validation.validate(PokeValidation.RENAME, payload)

    const poke = await prisma.myPoke.findUnique({ where: { id } });

    if(!poke) throw new ResponseError(400, "Poke not found!");

    const fibonacciValue = UtilHelper.fibonacci(poke?.renameCount!);

    const renamedName = `${name}-${fibonacciValue}`;

    const results = await prisma.myPoke.update({
      where: { id: payload?.id },
      data: {
        name: renamedName,
        renameCount: poke?.renameCount! + 1
      },
    });

    if (!results) throw new ResponseError(400, "Failed update poke!");

    return results;
  }

  static async getPoke() {
    const { results, ...meta } = await P.listPokemons(0, 100);

    const dataPoke = (
      await Promise.all(
        results?.map(async (data) => {
          return P.getPokemonByName(data.name);
        })
      )
    ).map((val) => ({
      id: val.id,
      name: val.name,
      form: val.forms,
      species: val.species,
      img: val?.sprites?.other?.home?.front_default,
      height: val?.height,
      weight: val?.weight,
    }));

    return {
      meta,
      data: dataPoke,
    };
  }

  static async detailPoke(payload: ByPokeRequest) {
    const { poke } = Validation.validate(PokeValidation.BY_POKE, payload);
    
    return await P.getPokemonByName(poke);
  }

  static async catchProbability(payload: CreateCatchPokeRequest) {
    const { username, poke } = Validation.validate(PokeValidation.CATCH, payload)

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) throw new ResponseError(400, "Username not found!");

    const checkMyDeck = await prisma.user.findUnique({
      where: { username, pokemons: { some: { defaultName: poke, deletedAt: null } } },
      include: { pokemons: true }
    });

    if (checkMyDeck) throw new ResponseError(400, "Poke already saved!");

    const randomPercent = Math.random() * 100;
    const success = randomPercent >= 50;

    let result: Record<string, any>

    if (success) {
      const pokemon = this.detailPoke({ poke });

      if (!pokemon) throw new ResponseError(400,"Pokemon not found!");

        result = await prisma.myPoke.create({
          data: {
            userId: user?.id!,
            name: (await pokemon).name,
            defaultName: poke,
            height: (await pokemon).height,
            weight: (await pokemon).weight,
            img: (await pokemon).sprites?.other?.home?.front_default!,
          },
        });
    }

    const percentString = randomPercent.toFixed(2) + "%";

    return {
      score: percentString,
      probability: success,
      result: result!
    };
  }

  static async releasePoke(payload: ByIdRequest): Promise<string | Error> {
    const { id } = Validation.validate(PokeValidation.BY_ID, payload)
    const checkExist = await prisma.myPoke.update({
      where: { id },
      data: { deletedAt: new Date() }
    })

    if(!checkExist) throw new ResponseError(400, "Cannot deleted your poke!")
    
    return "Success deleted your poke!"
  }
}