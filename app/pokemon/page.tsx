"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/app/ui/table";
import {pokemonApi} from "@/app/pokemon/_lib/data";
import Image from "next/image";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Pokemon} from "@/app/pokemon/_type/pokemon.type";
import {useEffect} from "react";
import useLoadingStore from "@/app/store/loading.store";
import {useStore} from "zustand/index";
import {useInView} from "react-intersection-observer";

export default function PokemonPage() {
    const {ref, inView} = useInView();
    const {setLoading} = useStore(useLoadingStore);

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["pokemons"],
        queryFn: async ({pageParam = 0}) => {
            setLoading(true);
            try {
                const result = await pokemonApi.getPokemonList(pageParam, 50);
                return result;
            } catch (error) {
                throw error;
            }finally {
                setLoading(false);
            }
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.length === 50 ? pages.length * 50 : undefined,
        initialData: {
            pages: [],
            pageParams: [0],
        },
    });


    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);


    return (
        <div className="container mx-auto space-y-[16px] mt-[32px]">
            <span className="text-[24px] font-[500]">List of pokemon</span>
            {data && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[10%]">ID</TableHead>
                            <TableHead className="w-[40%] ">Name</TableHead>
                            <TableHead className="w-[30%] ">Image</TableHead>
                            <TableHead className="">Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.pages.map((page) =>
                            page.map((itemPokemon: Pokemon, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{itemPokemon.id}</TableCell>
                                    <TableCell>{itemPokemon.name}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={itemPokemon.sprites.front_default as string}
                                            alt={itemPokemon.name}
                                            width={96}
                                            height={96}
                                            className="hover:scale-110 transition-transform mx-auto"
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">{itemPokemon.types.map(type => (
                                        <span
                                            key={type.type.name}
                                            className="inline-block px-2 py-1 mr-1 rounded-full bg-gray-200 text-gray-800 text-sm capitalize"
                                        >
                                                {type.type.name}
                                            </span>
                                    ))}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
            <div ref={ref}></div>
        </div>

    );
}