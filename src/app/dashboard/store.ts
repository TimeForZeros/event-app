import { create } from 'zustand';

type EventStoreState = {
  tagFilter: string[];
  deleteList: number[];
  enableDelete: boolean;
};
type EventStoreAction = {
  setTagFilter: (tagFilter: string[]) => void;
  setDeleteList: (value: number[] | ((val: number[]) => number[])) => void;
  setEnableDelete: (enableDelete: boolean) => void;
};

const useEvent = create<EventStoreState & EventStoreAction>((set) => ({
  tagFilter: [],
  deleteList: [],
  enableDelete: false,
  setEnableDelete: (enableDelete) => set({ enableDelete }),
  setTagFilter: (tagFilter) => set({ tagFilter }),
  setDeleteList: (value) =>
    set((state) => ({
      deleteList: typeof value === 'function' ? value(state.deleteList) : value,
    })),
}));

export default useEvent;
