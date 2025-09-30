'use client';

import { Button } from '@/components/ui/button';
import { logOut } from './actions';

const LogOutButton = () => <Button onClick={logOut} className='cursor-pointer'>Log Out</Button>;

export default LogOutButton;
