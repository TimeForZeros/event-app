import { create } from 'zustand';
import type { Event } from '@/db';


type EventStoreState = {
  tagFilter: string[];
};
type EventStoreAction = {
  setTagFilter: (tagFilter: string[]) => void;
};

const useEvent = create<EventStoreState & EventStoreAction>((set, get) => ({
  tagFilter: [],
  setTagFilter: (tagFilter) => set({ tagFilter }),
}));

export default useEvent;
