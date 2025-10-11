'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { Event, EventTag } from '@/db';
import TagList from './tag-list';
import EventDetails from './event-details';
import { Circle, CircleCheck } from 'lucide-react';
type EventCardProps = {
  event: Event;
  eventTags?: string[];
  deleteSelect?: boolean;
};
const EventCard = ({ event, eventTags, deleteSelect = true }: EventCardProps) => {
  return (
    <Card className="h-[15rem] m-2 shadow-sm relative">
      {deleteSelect && (
        <button aria-label='delete' onClick={(evt) => console.log(evt)} className="absolute top-1 right-1 opacity-25 cursor-pointer">
          <Circle />
        </button>
      )}
      <CardHeader className="grid grid-cols-4 items-center">
        <CardTitle className="col-span-3 text-center">
          {/* {event.name} */}
          <EventDetails event={event} />
        </CardTitle>
        <span className="text-xs">{event.date}</span>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.details}</p>
      </CardContent>
      <CardFooter>{!!eventTags?.length && <TagList eventTags={eventTags} />}</CardFooter>
    </Card>
  );
};

export default EventCard;
