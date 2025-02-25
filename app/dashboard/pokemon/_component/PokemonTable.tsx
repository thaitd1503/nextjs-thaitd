"use client";
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { pokemonApi } from "@/app/dashboard/pokemon/_lib/data";
import { Pokemon } from "@/app/dashboard/pokemon/_type/pokemon.type";

const pokemonQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam }) => {
      return await pokemonApi.getPokemonList(pageParam, 50);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 50 ? pages.length * 50 : undefined,
  });

interface PokemonListProps {
  initialPokemon: Pokemon[];
}

export default function PokemonTable() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(pokemonQueryOptions());

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">ID</TableHead>
            <TableHead className="w-[40%]">Name</TableHead>
            <TableHead className="w-[30%]">Image</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.pages.flatMap((page) =>
              page.map((pokemon) => (
                <TableRow key={pokemon.id}>
                  <TableCell>{pokemon.id}</TableCell>
                  <TableCell>{pokemon.name}</TableCell>
                  <TableCell>
                    <Image
                      className="mx-auto"
                      src={pokemon.sprites.front_default as string}
                      alt={pokemon.name}
                      width={96}
                      height={96}
                    />
                  </TableCell>
                  <TableCell>
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="inline-block px-2 py-1 mr-1 rounded-full bg-gray-200"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              )),
            )}
        </TableBody>
      </Table>
      <div ref={ref}></div>
    </div>
  );
}
