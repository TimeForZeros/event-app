import { Event } from '@/db';
import React, { useState } from 'react';
import EventCard from './event-card';


const EventContainer = ({ eventsList }: { eventsList: Event[] }) => {
  return (
    <div className=" min-h-[50%] w-[80vw] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {eventsList.map(({event, eventTags}) => (
        <EventCard key={event.id} event={event} eventTags={eventTags} />
      ))}
    </div>
  );
};

export default EventContainer;
