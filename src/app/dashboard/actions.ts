'use server';
import {
  db,
  event,
  eventTag,
  eventTagJunction,
  Event,
  NewEvent,
  EventTag,
  NewEventTag,
  NewEventTagJunction,
} from '@/db';
import { eq, inArray } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect('/login');
  return session;
};

export const getEvents = async (userId: string) => {
  const eventsList = await await db
    .select({ event, eventTag })
    .from(event)
    .fullJoin(eventTagJunction, eq(event.id, eventTagJunction.eventId))
    .fullJoin(eventTag, eq(eventTagJunction.tagId, eventTag.id))
    .where(eq(event.ownerId, userId));
    console.log(eventsList);
  return eventsList;
};

// type NewEventResponse = {
//   event: Event;
//   tags?: EventTag[];
// };
// TODO: fill out the data type
export const createNewEvent = async (data: any) => {
  const newEvent: NewEvent = {
    name: data.name,
    ownerId: data.ownerId,
    date: data.date || null,
    details: data.details,
  };
  const [eventRow] = await db.insert(event).values(newEvent).returning();
  // console.log(eventRow);
  // if (data.tags) {
  //   const tagNames = data.tags.map((tag) => tag.name);
  //   const tags = await db.select().from(eventTag).where(inArray(data.tags, eventTag.name));
  //   const missingTags = tagNames.filter((tagName) => !tags.some((tag) => tag.name === tagName));
  //   if (missingTags.length) {
  //     const newTags = await db.insert(eventTag).values(missingTags).returning();
  //     tags.push(...newTags);
  //   }
  //   const newEventTagJunctions = tags.map((tag) => ({ tagId: tag.id, eventId: eventRow.id }));
  //   await db.insert(eventTagJunction).values(newEventTagJunctions);
  // }
  revalidatePath('/dashboard');
};
