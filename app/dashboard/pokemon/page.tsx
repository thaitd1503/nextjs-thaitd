import PokemonTable from "@/app/dashboard/pokemon/_component/PokemonTable";
import { InvoicesTableSkeletonPokemon } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function PokemonList() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Pokemon</h1>
      </div>
      <Suspense fallback={<InvoicesTableSkeletonPokemon />}>
        <PokemonTable />
      </Suspense>
    </div>
  );
}
