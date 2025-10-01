import React from 'react';
import CreateEventModal from './create-event-modal';
import { getSession } from './actions';
import EventContainer from './event-container';

const Dashboard = async () => {
  const session = await getSession();
  if (!session) {
    // TODO: do something here
    return;
  }
  return (
    <section className='w-full h-full flex justify-center items-center'>
      <EventContainer />
      {/* <CreateEventModal userId={session.user.id} /> */}
    </section>
  );
};

export default Dashboard;
