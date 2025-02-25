import KyClient from "@/app/services/KyClient";

import {
  PokemonListSchema,
  PokemonSchema,
} from "@/app/dashboard/pokemon/_type/pokemon.type";

export class PokemonApi {
  async getPokemonList(offset: number = 0, limit: number = 50) {
    try {
      const response = await KyClient.get("pokemon", {
        searchParams: { offset: offset, limit: limit },
      }).json();
      const newListPokemon = PokemonListSchema.parse(response);

      const lstPokemonDetails = await Promise.all(
        newListPokemon.results.map((pokemon) =>
          this.getDetailPokemon(pokemon.name),
        ),
      );

      return lstPokemonDetails;
    } catch (error) {
      console.error("Failed to fetch Pokemon list:", error);
      throw new Error("Failed to fetch Pokemon list");
    }
  }

  async getDetailPokemon(name: string) {
    try {
      const response = await KyClient.get(`pokemon/${name}`).json();
      return PokemonSchema.parse(response);
    } catch (error) {
      console.error("Failed to fetch Pokemon details:", error);
      throw new Error("Failed to fetch Pokemon details");
    }
  }
}

export const pokemonApi = new PokemonApi();
