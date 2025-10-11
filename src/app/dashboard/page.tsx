import { getEvents } from './actions';
import EventSection from './(event-section)/event-section';

const Dashboard = async () => {
  const eventsData = await getEvents();
  return (
    <EventSection eventsData={eventsData} />
  );
};

export default Dashboard;
