'use client';
import { Event } from '@/db';
import EventCard from './event-card/event-card';
type EventWithTags = {
  event: Event;
  eventTags?: string[];
};
import useEvent from '../../../store';
import { useMemo, useCallback } from 'react';

type EventContainerProps = {
  eventsData: EventWithTags[];
};
const EventContainer = ({ eventsData }: EventContainerProps) => {
  const store = useEvent();
  const {setDeleteList} = store;
  const eventsList = useMemo(() => {
    if (!store.tagFilter.length) return eventsData;
    return eventsData.filter((eventData) =>
      store.tagFilter.every((tag) => eventData.eventTags?.includes(tag)),
    );
  }, [store.tagFilter, eventsData]);

  const updateDeleteList = useCallback((eventId: number) => {
    setDeleteList((prev: number[]) => {
      const deleteList = [...prev];
      const evtIdx = deleteList.indexOf(eventId);
      if (evtIdx >= 0) {
        deleteList.splice(evtIdx, 1);
      } else {
        deleteList.push(eventId);
      }
      return deleteList;
    });
  }, [setDeleteList]);
  return (
    <div className=" min-h-[50%] m-4 grid grid-cols-1 gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {eventsList.map(({ event, eventTags }) => (
        <EventCard
          key={event.id}
          event={event}
          eventTags={eventTags}
          deleteSelect={store.enableDelete}
          handleClick={updateDeleteList}
          isSelected={store.deleteList.includes(event.id)}
        />
      ))}
    </div>
  );
};

export default EventContainer;
