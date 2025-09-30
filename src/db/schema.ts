import { user } from './auth-schema';
export * from './auth-schema';

import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
  index,
  geometry,
  date,
} from 'drizzle-orm/pg-core';

export const placeCategory = pgTable('place_category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 7 }),
});

export const place = pgTable(
  'place',
  {
    id: serial('id').primaryKey(),
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
  id: serial('id').primaryKey(),
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
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  placeId: integer('place_id')
    .references(() => place.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Type exports
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Place = typeof place.$inferSelect;
export type NewPlace = typeof place.$inferInsert;
export type Visit = typeof visit.$inferSelect;
export type NewVisit = typeof visit.$inferInsert;
