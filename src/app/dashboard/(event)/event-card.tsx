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
import useEvent from './store';

type EventCardProps = {
  event: Event;
  eventTag: EventTag;
};

const EventCard = ({ event }: EventCardProps) => {
  console.log(event);
  return (
    <Card className="h-[15rem] m-2 shadow-sm">
      <CardHeader className="grid grid-cols-4 items-center">
        <CardTitle className="col-span-3 text-center">{event.name}</CardTitle>
        <span className="text-xs">{event.date}</span>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.details}</p>
      </CardContent>
      <CardFooter>
        {/* <TagList tags={eventTag} /> */}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
