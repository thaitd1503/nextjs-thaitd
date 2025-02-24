import {KyClient} from '@/app/services/KyClient';
import {Pokemon, PokemonListSchema, PokemonSchema} from "@/app/pokemon/_type/pokemon.type";
export class  PokemonApi  {
    async getPokemonList(
        offset: number = 0,
        limit: number = 50
    ): Promise<Pokemon[]> {
        try {
            const response = await KyClient.get(`pokemon`,{
                offset: offset,
                limit:limit
            })
            const newListPokemon  = PokemonListSchema.parse(response)

            const lstPokemonDetails = await Promise.all(newListPokemon.results.map(async (pokemon) => {
                return await this.getDetailPokemon(pokemon.name)
            }))

            return lstPokemonDetails
        } catch (error) {
            console.error("Failed to fetch Pokemon list:", error);
            throw new Error("Failed to fetch Pokemon list");
        }
    }

    async getDetailPokemon(
       id: string | number
    ): Promise<Pokemon> {
        try {
            const response = await KyClient.get(`pokemon/${id}`,)
            return PokemonSchema.parse(response);
        } catch (error) {
            console.error("Failed to fetch Pokemon list:", error);
            throw new Error("Failed to fetch Pokemon list");
        }
    }
}

export const pokemonApi = new PokemonApi();