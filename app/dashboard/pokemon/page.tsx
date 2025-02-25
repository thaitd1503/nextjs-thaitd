import PokemonTable from "@/app/dashboard/pokemon/_component/PokemonTable";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { pokemonApi } from "@/app/dashboard/pokemon/_lib/data";

export default async function PokemonList() {
  const initialPokemon = await pokemonApi.getPokemonList();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Pokemon</h1>
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <PokemonTable initialPokemon={initialPokemon} />
      </Suspense>
    </div>
  );
}
