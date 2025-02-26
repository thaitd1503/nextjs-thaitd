'use client';

import '@/app/ui/loading/loading.css';

import useLoadingStore from '@/app/pokemon/_store/loading.store';
import {useStore} from 'zustand';
import {useEffect} from 'react';

export default function Loading() {
    const {isLoading} = useStore(useLoadingStore);
    useEffect(() => {
        if (isLoading) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isLoading]);
    return (
        isLoading && (
            <div className="fixed w-full h-full bg-black z-[99999] opacity-[30%] overscroll-none top-0">
                <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="w-[500px] ">
                        <div className="snippet">
                            <div className="stage flex gap-x-[4px]">
                                <div className="dot-flashing"></div>
                                <div className="dot-flashing"></div>
                                <div className="dot-flashing"></div>
                                <div className="dot-flashing"></div>
                                <div className="dot-flashing"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

