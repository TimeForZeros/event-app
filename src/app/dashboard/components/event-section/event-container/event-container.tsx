'use client';
import { Event } from '@/db';
import EventCard from './event-card/event-card';
type EventWithTags = {
  event: Event;
  eventTags?: string[];
};
import useEvent from '../../../store';
import { useCallback, useMemo, useRef, useState } from 'react';

type EventContainerProps = {
  eventsData: EventWithTags[];
};
const EventContainer = ({ eventsData }: EventContainerProps) => {
  const store = useEvent();
  const eventsList = useMemo(() => {
    if (!store.tagFilter.length) return eventsData;
    return eventsData.filter((eventData) =>
      store.tagFilter.every((tag) => eventData.eventTags?.includes(tag)),
    );
  }, [store.tagFilter, eventsData]);
  const updateDeleteList = useCallback((eventId: number) => {
    const deleteList = [...store.deleteList];
    const evtIdx = deleteList.indexOf(eventId);
    if (evtIdx >= 0) {
      deleteList.splice(evtIdx, 1);
    } else {
      deleteList.push(eventId);
    }
    store.setDeleteList(deleteList);
  }, [store.deleteList]);
  return (
    <div className=" min-h-[50%] w-[80vw] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
