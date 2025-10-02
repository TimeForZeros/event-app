import React from 'react';
import CreateEventModal from './create-event-modal';
import { getEvents, getSession } from './actions';
import EventCard from './event-card';

const Dashboard = async () => {
  const { session, user } = await getSession();
  const eventsList = await getEvents(user.id);
  return (
    <section className="w-full h-full flex justify-center items-center">
      <CreateEventModal userId={user.id} />
      <div className="w-[90%] min-h-[50%] py-1 border-2 shadow-2xl rounded-4xl flex flex-wrap justify-center items-center">
        {eventsList.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
};

export default Dashboard;
