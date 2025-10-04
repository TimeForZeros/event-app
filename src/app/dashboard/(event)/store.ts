import { create } from 'zustand';
import type { Event } from '@/db';

type EventStoreState = {
  userId: string;
  eventsList: Event[];
  tagFilter: string[];
  filteredEvents: () => Event[];
};
type EventStoreAction = {
  setUserId: (userId: string) => void;
  setEventsList: (eventsList: Event[]) => void;
  setTagFilter: (tagFilter: string[]) => void;
  addTagFilter: (tag: string) => void;
};

const useEvent = create<EventStoreState & EventStoreAction>((set, get) => ({
  userId: '',
  eventsList: [],
  tagFilter: [],
  filteredEvents: () =>
    !get().tagFilter.length
      ? get().eventsList
      : get().eventsList.filter((event) =>
          get().tagFilter.every((tag) => event.tags.includes(tag)),
        ),
  setUserId: (userId) => set({ userId }), // TODO: check if should be one and done
  setEventsList: (eventsList) => set({ eventsList }),
  setTagFilter: (tagFilter) => set({ tagFilter }),
  addTagFilter: (tag) => set({ tagFilter: [...new Set([...get().tagFilter, tag])] }),
}));

export default useEvent;
