import { getEvents } from './actions';
import EventSection from './(event)/event-section';

const Dashboard = async () => {
  const eventsList = await getEvents();
  return (
    <EventSection eventsList={eventsList} />
  );
};

export default Dashboard;
