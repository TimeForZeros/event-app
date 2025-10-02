import { user } from './auth-schema';
export * from './auth-schema';
import {
  pgTable,
  bigserial,
  varchar,
  text,
  timestamp,
  bigint,
  date,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const eventTag = pgTable('event_tag', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 100 }).unique().notNull(),
});

export const event = pgTable('event', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 126 }).notNull(),
  tags: text('tags').array().default([]).notNull(),
  date: date(),
  details: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const eventTagJunction = pgTable(
  'event_tag_junction',
  {
    eventId: bigint('event_id', { mode: 'number' })
      .notNull()
      .references(() => event.id, { onDelete: 'cascade' }),
    tagId: bigint('tag_id', { mode: 'number' })
      .notNull()
      .references(() => eventTag.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.eventId, table.tagId] })],
);

/*
export const placeCategory = pgTable('place_category', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 7 }),
});

export const place = pgTable(
  'place',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
    location: geometry('location', { type: 'point', mode: 'xy', srid: 4326 }).notNull(),
    address: text('address'),
    placeType: varchar('place_type', { length: 50 }),
    categoryId: integer('category_id').references(() => placeCategory.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('spatial_index').using('gist', table.location)],
);

export const visit = pgTable('visit', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  placeId: integer('place_id')
    .references(() => place.id, { onDelete: 'cascade' })
    .notNull(),
  visitDate: date('visit_date').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const favoritePlace = pgTable('favorite_place', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  placeId: integer('place_id')
    .references(() => place.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Place = typeof place.$inferSelect;
export type NewPlace = typeof place.$inferInsert;
export type Visit = typeof visit.$inferSelect;
export type NewVisit = typeof visit.$inferInsert;
*/

// Type exports
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Event = typeof event.$inferSelect;
export type NewEvent = typeof event.$inferInsert;
export type EventTag = typeof eventTag.$inferSelect;
export type NewEventTag = typeof eventTag.$inferInsert;
export type EventTagJunction = typeof eventTagJunction.$inferSelect;
export type NewEventTagJunction = typeof eventTagJunction.$inferInsert;
