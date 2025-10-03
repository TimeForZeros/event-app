import { getEvents, getSession } from './actions';
import EventSection from './(event)/event-section';

const Dashboard = async () => {
  const { user } = await getSession();
  const eventsList = await getEvents(user.id);
  return (
    <EventSection userId={user.id} eventsList={eventsList} />
  );
};

export default Dashboard;
