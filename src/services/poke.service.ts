import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { PokemonClient } from "pokenode-ts";

const prisma = new PrismaClient();
const P = new PokemonClient();

export class PokeService {
  static async loginUsername(username: string) {
    let user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: { pokemons: { where: { deletedAt: null } } },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: username,
        },
        include: { pokemons: true },
      });
    }

    return user;
  }

  static async renamePoke(payload: UpdateMyPokeDto) {
    const results = await prisma.myPoke.update({
      where: { id: payload?.id },
      data: {
        name: payload?.name,
      },
    });

    if (!results) throw new Error("Poke not found!");

    return "Success updated name poke!";
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

  static async detailPoke(name: string) {
    return await P.getPokemonByName(name);
  }

  static async catchProbability({ username, poke }: PokeDto) {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) throw Error("Username not found!");

    const checkMyDeck = await prisma.user.findUnique({
      where: { username, pokemons: { some: { name: poke } } },
    });

    if (checkMyDeck) return createHttpError.BadRequest("Poke already saved!");

    const randomPercent = Math.random() * 100;
    const success = randomPercent >= 50;

    let result: Record<string, any>

    if (success) {
      const pokemon = this.detailPoke(poke);

      if (!pokemon) throw Error("Pokemon not found!");

        result = await prisma.myPoke.create({
          data: {
            userId: user?.id!,
            name: (await pokemon).name,
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

  static async releasePoke(id: number): Promise<string | Error> {
    const checkExist = await prisma.myPoke.update({
      where: { id: id },
      data: { deletedAt: new Date() }
    })

    if(!checkExist) throw new Error("Cannot deleted your poke!")
    
    return "Success deleted your poke!"
  }
}

interface PokeDto {
  username: string;
  poke: string;
}

interface UpdateMyPokeDto {
  id: number;
  name: string;
}
