import { create } from 'zustand';


type EventStoreState = {
  tagFilter: string[];
  deleteList: number[];
  enableDelete: boolean,
};
type EventStoreAction = {
  setTagFilter: (tagFilter: string[]) => void;
  setDeleteList: (deleteList: number[]) => void;
  setEnableDelete: (enableDelete: boolean) => void;
};

const useEvent = create<EventStoreState & EventStoreAction>((set) => ({
  tagFilter: [],
  deleteList: [],
  enableDelete: false,
  setEnableDelete: (enableDelete) => set({enableDelete}),
  setTagFilter: (tagFilter) => set({ tagFilter }),
  setDeleteList: (deleteList) =>set({deleteList}),
}));

export default useEvent;
