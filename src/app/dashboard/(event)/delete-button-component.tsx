'use client';
import { Button } from '@/components/ui/button';
import useEvent from './store';

const DeleteButtonComponent = () => {
  const store = useEvent();
  return store.enableDelete ? (
    <nav>
      <Button onClick={() => {}} variant="destructive">Confirm Delete</Button>
      <Button onClick={() => store.setEnableDelete(false)}>Cancel</Button>
    </nav>
  ) : (
    <Button onClick={() => store.setEnableDelete(true)} variant="destructive">
      DELETE
    </Button>
  );
};

export default DeleteButtonComponent;
