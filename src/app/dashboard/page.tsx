import React from 'react';
import CreateEventModal from './create-event-modal';


const Dashboard = () => {
  return (
    <section>
      <h1 className="mx-auto w-[50%] place-items-center text-center">Test</h1>
      <CreateEventModal />
      <div className=" w-[100%] flex justify-center items-center"></div>
    </section>
  );
};

export default Dashboard;
