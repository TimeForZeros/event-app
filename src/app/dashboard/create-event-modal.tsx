'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormComponent from '../form';
import type { FieldTypes } from '../types';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewEvent } from './actions';
import { z } from 'zod';

type NewEventFormSchema = z.infer<typeof newEventFormSchema>;

const newEventFormSchema = z.object({
  name: z.string().nonempty('Please provide a name'),
  date: z.string(),
  details: z.string(),
  tags: z
    .string()
    .refine((tagStr) => !tagStr.length || tagStr.charAt(0) === '#', 'Tags must start with #')
    .refine((tagStr) => !tagStr.length || tagStr.trim().length > 1, 'empty tag')
    .optional(),
});

const fieldTypes: FieldTypes = {
  name: 'text',
  details: 'textarea',
  date: 'date',
  tags: 'text',
};

const CreateEventModal = ({ userId }: { userId: string }) => {
  const form = useForm<NewEventFormSchema>({
    resolver: zodResolver(newEventFormSchema),
    defaultValues: {
      name: '',
      details: '',
      date: '',
      tags: '',
    },
  });
  const handleSubmit = async (data: NewEventFormSchema) => {
    const tags = data.tags
      ? data.tags
          .split('#')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];
    const res = await createNewEvent({ ...data, ownerId: userId, tags });
    console.log(res);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>
        <FormComponent form={form} fieldTypes={fieldTypes} handleAction={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </FormComponent>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
