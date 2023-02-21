import Head from 'next/head'
import Image from 'next/image'
import { HiOutlineUsers, HiOutlineMusicNote } from 'react-icons/hi';
import GBtn from '@/components/GBtn';
import GLink from '@/components/GLink';

export default function Home() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-23 bg-grid'>
      <div className='flex justify-center items-center h-[400px] md:h-[100vh] px-10'>
        <div className='flex flex-col gap-4 items-center justify-center h-full'>
            <div className='flex justify-center'>
              <h1 className=' text-[72px] text-white font-bold'>Music Site</h1>
            </div>
            <div>
              <Image src="/wave.png" width="200" height="60" alt="wave" />
            </div>
            <div className='flex justify-center items-center gap-2 mt-10'>
              <GLink href="/login">Login</GLink>
              <GLink href="/register">Register</GLink>
            </div>
          </div>
        </div>
      <div className='flex flex-col gap-2 items-center justify-center px-10 [&>div]:w-[300px] md:[&>div]:w-full'>
        <div className="grad px-4 py-2 text-white rounded-md">
          <h1 className='text-[20px] font-semibold flex items-start md:items-center gap-2'><HiOutlineMusicNote /> Share your songs</h1>
          <p className='text-white text-sm font-medium mt-2'>- Upload tracks directly to your profile</p>
        </div>
        <div className="grad px-4 py-2 text-white rounded-md">
          <h1 className='text-[20px] font-semibold flex items-start md:items-center gap-2'><HiOutlineUsers /> Connect with other artists</h1>
          <p className='text-white text-sm font-medium mt-2'>- Search for other artists based on type, genre, and stats!</p>
          <p className='text-white text-sm font-medium mt-2'>- Instantly message artists & attach your tracks.</p>
        </div>
      </div>
    </div>
  )
}
