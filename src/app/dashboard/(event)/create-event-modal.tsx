'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormComponent from '../../form';
import type { FieldTypes } from '../../types';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewEvent } from '../actions';
import { z } from 'zod';
import { useState } from 'react';

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

const CreateEventModal = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    const event = {
      name: data.name,
      details: data.details,
      date: data.date,
    };
    const res = await createNewEvent({ event, tags });
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="default" className="rounded-xl">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>
        <FormComponent form={form} fieldTypes={fieldTypes} handleAction={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </FormComponent>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
