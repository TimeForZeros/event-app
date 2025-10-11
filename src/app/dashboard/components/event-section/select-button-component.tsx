'use client';
import { Button } from '@/components/ui/button';
import useEvent from '../../store';
import { deleteEvents } from '../../actions';
import { Trash2, X } from 'lucide-react';
const SelectButtonComponent = () => {
  const store = useEvent();
  const handleDeletion = async () => {
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
      <Button className='mx-0.5' aria-label="Delete" onClick={handleDeletion} variant="destructive">
        <Trash2 />
      </Button>
      <Button className='mx-0.5' onClick={() => store.setEnableDelete(false)}>
        <X />
      </Button>
    </nav>
  ) : (
    <Button className='mx-0.5' onClick={cancelDeletion} variant="secondary">
      Select
    </Button>
  );
};

export default SelectButtonComponent;
