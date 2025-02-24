import { create } from "zustand";

type LoadingState = {
    isLoading: boolean;
    setLoading: (state: boolean) => void;
}
const useLoadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    setLoading: (state: boolean) => set({ isLoading: state }),
}));

export default useLoadingStore;