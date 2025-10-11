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
import { useState } from 'react';
/* eslint-disable  @typescript-eslint/no-explicit-any */
const EventDetails = ({ event }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="link" className="text-xl">
          {event.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>

        {/* <FormComponent form={form} fieldTypes={fieldTypes} handleAction={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </FormComponent> */}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;
