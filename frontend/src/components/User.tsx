'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';

export const User = ({ cartData }: { cartData: any }) => {
  const router = useRouter();
  const { user }: any = useUser();
  const logOut = async () => {
    try {
      if (cartData.length > 0) {
        await axios.delete(`http://localhost:8000/api/cart/${user?.sub}`);
      }
      localStorage.removeItem('invoice');
      localStorage.removeItem('cartItems');
      await router.push('/api/auth/logout', { scroll: false });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PersonIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('logIn', { scroll: false })}
        >
          <img
            src={user?.picture ?? '/default-avatar.png'}
            alt='User avatar'
            className='w-10 h-10 rounded-full'
          />
          <span className='text-[#565656] font-normal max-sm:hidden'>
            {user.nickname}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className='flex gap-2 items-center justify-center w-full'
            onClick={logOut}
          >
            Log Out
            <LogoutIcon sx={{ color: '#565656' }} />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
