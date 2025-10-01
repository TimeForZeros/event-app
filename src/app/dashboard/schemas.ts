import { z } from 'zod';

export type NewEventFormSchema = z.infer<typeof newEventFormSchema>;

export const newEventFormSchema = z.object({
  name: z.string().nonempty('Please provide a name'),
  date: z.string(),
  details: z.string(),
  tags: z.string().refine((tagStr) => {
    if (tagStr.length && tagStr.charAt(0) !== '#') {
      throw new Error('Tags must start with #')
    }
  })
});
