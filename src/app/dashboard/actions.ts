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

export const getSession = async () =>
  auth.api.getSession({
    headers: await headers(),
  });

export const addTags = async (eventId: number, tagString: string) => {
  const getExistingTags = async (tagNames: string[]): Promise<EventTag[]> =>
    db.select().from(eventTag).where(inArray(eventTag.name, tagNames));

  const tagNames = tagString
    .split('#')
    .map((tag) => tag.trim())
    .filter(Boolean);
  const tagRows = await getExistingTags(tagNames);

  // create missing tags
  if (tagRows.length < tagNames.length) {
    const existingNames = tagRows.map((row) => row.name);
    const newTags: NewEventTag[] = tagNames
      .filter((tagName) => !existingNames.includes(tagName))
      .map((tagName) => ({ name: tagName }));
    const inserted = await db.insert(eventTag).values(newTags).onConflictDoNothing().returning();
    tagRows.push(...inserted);
  }
  // get current junctions
  const tagJunctions = await db
    .select()
    .from(eventTagJunction)
    .where(eq(eventTagJunction.eventId, eventId));
  const newTagIds: number[] = [];
  if (tagJunctions.length) {
    const existingTagRelations = tagJunctions.map((tagJunction) => tagJunction.tagId);
    tagRows
      .filter((tagRow) => !existingTagRelations.includes(tagRow.id))
      .forEach((tagRow) => newTagIds.push(tagRow.id));
  } else {
    tagRows.forEach((tag) => newTagIds.push(tag.id));
  }
  if (newTagIds.length) {
    console.log('hits');
    const tagRelationsArr = newTagIds.map((tagId): NewEventTagJunction => ({ tagId, eventId }));
    if (tagRelationsArr.length) {
      await db.insert(eventTagJunction).values(tagRelationsArr);
    }
  }

  return tagRows;
};

type NewEventResponse = {
  event: Event;
  tags?: EventTag[];
};
// TODO: fill out the data type
export const createNewEvent = async (data: any) => {
  const newEvent: NewEvent = {
    name: data.name,
    ownerId: data.ownerId,
    date: data.date || null,
    details: data.details,
  };
  console.log(newEvent);
  const [eventRow] = await db.insert(event).values(newEvent).returning();
  const response: NewEventResponse = { event: eventRow };
  if (data.tags) {
    const eventTags = await addTags(eventRow.id, data.tags);
    response.tags = eventTags;
  }
  return response;
};
