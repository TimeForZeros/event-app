import { create } from 'zustand';
import type { Event } from '@/db';

type EventStoreState = {
  userId: string;
  eventsList: Event[];
  tagFilter: string[];
  filteredEvents: Event[];
};
type EventStoreAction = {
  setUserId: (userId: string) => void;
  setEventsList: (eventsList: Event[]) => void;
  setTagFilter: (tagFilter: string[]) => void;
  filterEvents: (evt: React.MouseEvent<HTMLElement>) => void;
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
  filterEvents: (evt) =>
    set((state) => {
      const tagElement = evt.target as HTMLElement;
      const filterKey = tagElement.innerText.slice(1);
      const tagFilter = [...new Set([...state.tagFilter, filterKey])];
      state.tagFilter = tagFilter;
    }),
}));

export default useEvent;
