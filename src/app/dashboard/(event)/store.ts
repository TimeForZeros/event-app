import { create } from 'zustand';
import type { Event } from '@/db';

type EventStoreState = {
  eventsList: Event[];
  tagFilter: string[];
};
type EventStoreAction = {
  setEventsList: (eventsList: Event[]) => void;
  setTagFilter: (tagFilter: string[]) => void;
};

const useEvent = create<EventStoreState & EventStoreAction>((set, get) => ({
  eventsList: [],
  tagFilter: [],
  setEventsList: (eventsList) => set({ eventsList }),
  setTagFilter: (tagFilter) => set({ tagFilter }),
}));

export default useEvent;
