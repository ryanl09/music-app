import React from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { GrUpgrade } from 'react-icons/gr';
import { useSession } from 'next-auth/react';

export default function SideNav() {

    const { data:session, status } = useSession();

    let username = '';
    if (status === 'authenticated'){
        username=session.user.name;
    }

    return (
        <div className='bg-dg-0 px-2 py-2 text-white flex flex-col gap-2'>
            <div className='grad rounded-md px-2 py-3 font-medium text-lg text-center'>CollabRoom</div>
            <Link href="/dashboard" className='rounded-md hover:bg-dg-200 px-2 py-3 --bg flex items-center gap-3'><AiOutlineHome /> Home</Link>
            <Link href="/search" className='rounded-md hover:bg-dg-200 px-2 py-3 --bg flex items-center gap-3'><HiOutlineSearch /> Search</Link>
            <Link href="/subscribe" className='rounded-md hover:bg-dg-200 px-2 py-3 --bg flex items-center gap-3'><GrUpgrade />Subscribe</Link>
            <Link href={`/user/${username}`} className='rounded-md hover:bg-dg-200 px-2 py-3 --bg flex items-center gap-3'><FaUserCircle /> Profile</Link>
            <Link href="/logout" className='rounded-md hover:bg-dg-200 px-2 py-3 --bg flex items-center gap-3 mt-auto'><BiLogOut /> Logout</Link>
        </div>
    );
}