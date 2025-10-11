'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { memo, useState } from 'react';
import { Event } from '@/db';
import TagList from './tag-list';
import EventDetails from './event-details';
import { Circle, CircleCheck } from 'lucide-react';
type EventCardProps = {
  event: Event;
  eventTags?: string[];
  deleteSelect?: boolean;
  handleClick: (eventId: number) => void;
};

const DeleteIcon = ({ selected, eventId }: { selected?: boolean; eventId: number }) => (
  <button className="absolute top-1 right-1 opacity-25 cursor-pointer">
    {selected ? <CircleCheck data-event-id={eventId} /> : <Circle data-event-id={eventId} />}
  </button>
);

const EventCard = ({ event, eventTags, deleteSelect, handleClick }: EventCardProps) => {
  const [selected, setSelected] = useState(false);
  const selectForDeletion = () => {
    setSelected((prev) => !prev);
    handleClick(event.id);
  };
  return (
    <Card onClick={selectForDeletion} className="h-[15rem] m-2 shadow-sm relative">
      {deleteSelect && <DeleteIcon selected={selected} eventId={event.id} />}
      <CardHeader className="grid grid-cols-4 items-center">
        <CardTitle className="col-span-3 text-center">
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

export default memo(EventCard);
