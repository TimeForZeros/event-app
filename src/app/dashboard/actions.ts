'use server';
import { db, event, eventTag, eventTagJunction, EventTag, Event, NewEvent } from '@/db';
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
export const getEvents = async () => {
  const { user } = await getSession();
  const eventsList = await db
    .select({ event, eventTags: sql<string[]>`json_agg(${eventTag.name})` })
    .from(event)
    .innerJoin(eventTagJunction, eq(event.id, eventTagJunction.eventId))
    .innerJoin(eventTag, eq(eventTagJunction.tagId, eventTag.id))
    .where(eq(event.ownerId, user.id))
    .groupBy(event.id);
  return eventsList;
};

type NewEventData = {
  event: Omit<NewEvent, 'ownerId'>;
  tags?: string[];
};

export const createNewEvent = async (data: NewEventData) => {
  const { user } = await getSession();
  const newEvent: NewEvent = {
    name: data.event.name,
    date: data.event.date || null,
    details: data.event.details,
    ownerId: user.id,
  };
  const [eventRow] = await db.insert(event).values(newEvent).returning();
  if (data.tags?.length) {
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
