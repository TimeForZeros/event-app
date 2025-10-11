'use client';
import { Event } from '@/db';
import EventCard from './event-card';
type EventWithTags = {
  event: Event;
  eventTags?: string[];
};
import useEvent from './store';
import { useMemo } from 'react';

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

  return (
    <div className=" min-h-[50%] w-[80vw] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {eventsList.map(({ event, eventTags }) => (
        <EventCard key={event.id} event={event} eventTags={eventTags} />
      ))}
    </div>
  );
};

export default EventContainer;
