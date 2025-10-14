import EventContainer from './event-container/event-container';
import CreateEventModal from '../create-event-modal';
import type { Event } from '@/db';
import SelectButtonComponent from './select-button-component';

type EventWithTags = {
  event: Event;
  eventTags?: string[];
};

type EventSectionProps = {
  eventsData: EventWithTags[];
};

const EventSection = ({ eventsData }: EventSectionProps) => {
  return (
    <section className="w-full h-full flex justify-center pt-1">
      <div className="w-[90%] rounded-2xl shadow-md">
        <div id="top-row" className="bg-slate-400 rounded-t-2xl p-2 grid grid-cols-3">
          <h1 className="col-span-2 text-center text-xl font-bold"></h1>
          <nav className="flex flex-row-reverse">
            <SelectButtonComponent />
            <CreateEventModal />
          </nav>
        </div>
          <EventContainer eventsData={eventsData} />
      </div>
    </section>
  );
};

export default EventSection;
