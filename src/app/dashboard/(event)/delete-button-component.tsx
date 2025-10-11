'use client';
import { Button } from '@/components/ui/button';
import useEvent from './store';
import { deleteEvents } from '../actions';
const DeleteButtonComponent = () => {
  const store = useEvent();
  const handleDeletion = async () => {
    console.log(store.deleteList);
    if (!store.deleteList.length) return;
    await deleteEvents(store.deleteList);
    store.setEnableDelete(false);
  };
  const cancelDeletion = () => {
    store.setDeleteList([]);
    store.setEnableDelete(true);
  };
  return store.enableDelete ? (
    <nav>
      <Button onClick={handleDeletion} variant="destructive">
        Confirm Delete
      </Button>
      <Button onClick={() => store.setEnableDelete(false)}>Cancel</Button>
    </nav>
  ) : (
    <Button onClick={cancelDeletion} variant="destructive">
      DELETE
    </Button>
  );
};

export default DeleteButtonComponent;
