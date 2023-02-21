import React, { useState } from 'react';
import GBtn from '@/components/GBtn';
import GLink from '@/components/GLink'
import Image from 'next/image';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    function updateForm(e){
        const t = e.target;
        const temp = Object.assign({}, form);
        temp[t.name] = t.value;
        setForm(temp);
    }

    async function submitForm() {

    }

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
              </div>
            </div>
          <div className='flex flex-col gap-2 items-center justify-center px-10 [&>div]:w-[300px] md:[&>div]:w-full'>
            <div className='px-4 py-1 flex flex-col gap-2'>
                <p className='text-white font-semibold text-xl w-fit m-auto'>Login</p>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Username</p>
                    <input type="text" name="username" value={form.username} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Password</p>
                    <input type="password" name="password" value={form.password} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <GBtn onClick={submitForm}>Submit</GBtn>
                <Link href="/register" className='text-white text-sm flex items-center gap-2 hover:text-white/80'><HiChevronLeft /> Click here to register</Link>
            </div>
          </div>
        </div>
    )
}