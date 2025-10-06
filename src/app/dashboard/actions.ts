'use server';
import {
  db,
  event,
  eventTag,
  eventTagJunction,
  NewEvent,
} from '@/db';
import { eq, inArray, sql } from 'drizzle-orm';
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
  const eventsList = await db
    .select({ event, eventTags: sql<string[]>`json_agg(${eventTag.name})` })
    .from(event)
    .innerJoin(eventTagJunction, eq(event.id, eventTagJunction.eventId))
    .innerJoin(eventTag, eq(eventTagJunction.tagId, eventTag.id))
    .where(eq(event.ownerId, userId))
    .groupBy(event.id);
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
  if (data.tags.length) {
    const tags = await db.select().from(eventTag).where(inArray(eventTag.name, data.tags));
    const missingTags = data.tags
      .filter((tagName) => !tags.some((tag) => tag.name === tagName))
      .map((tag) => ({ name: tag }));
    if (missingTags.length) {
      const newTags = await db
        .insert(eventTag)
        .values(missingTags)
        .onConflictDoNothing()
        .returning();
      tags.push(...newTags);
    }
    const newEventTagJunctions = tags.map((tag) => ({ tagId: tag.id, eventId: eventRow.id }));
    await db.insert(eventTagJunction).values(newEventTagJunctions);
  }
  revalidatePath('/dashboard');
};
