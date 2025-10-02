import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { Event } from '@/db';
type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="w-[12rem] h-[15rem] m-2 shadow-sm">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        {/* TODO: create a filter when clicking a tag */}
        <CardDescription>{event.tags.length > 0 && `#${event.tags.join(' #')}`}</CardDescription>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <span>{event.date}</span>
        <p>{event.details}</p>
      </CardContent>
      <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
    </Card>
  );
};

export default EventCard;
