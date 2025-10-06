'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EventContainer from './event-container';
import CreateEventModal from './create-event-modal';
import type { Event, EventTag } from '@/db';
import useEvent from './store';

type EventWithTags = Event & EventTag;

type EventSectionProps = {
  eventsList: EventWithTags[];
  userId: string;
};

const EventSection = ({ userId, eventsList }: EventSectionProps) => {
  const store = useEvent();
  useEffect(() => {
    store.setUserId(userId);
    store.setEventsList(eventsList);
  }, [userId, eventsList]);

  return (
    <section className="w-full h-full flex justify-center items-center pt-1">
      <div className="rounded-2xl shadow-md">
        <div id="top-row" className="bg-slate-400 rounded-t-2xl p-2 grid grid-cols-3">
          <h1 className="col-span-2 text-center text-xl font-bold">Events</h1>
          <nav className="flex flex-row-reverse">
            <Button variant="destructive">DELETE</Button>
            <CreateEventModal userId={userId} />
          </nav>
        </div>
        <EventContainer eventsList={eventsList} />
      </div>
    </section>
  );
};

export default EventSection;
