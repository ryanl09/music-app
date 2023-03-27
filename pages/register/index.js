import React, { useState } from 'react';
import GBtn from '@/components/GBtn';
import GLink from '@/components/GLink'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { HiChevronLeft } from 'react-icons/hi';
import { signIn } from 'next-auth/react';
import Router from 'next/router';

export default function Register() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState('');

    function updateForm(e){
        const t = e.target;
        const temp = Object.assign({}, form);
        temp[t.name] = t.value;
        setForm(temp);
    }

    async function submitForm() {
        if (form.name.length <= 0){
            setError('Name is empty');
            return;
        }
        
        if (form.email.length <= 0){
            setError('Email is empty');
            return;
        }
        
        if (form.username.length < 3 || form.username.length > 20){
            setError('Username must be between 3-20 characters');
            return;
        }
        
        if (form.password.length <= 0 || form.confirmpassword.length <= 0){
            setError('Password is empty');
            return;
        }

        const f = await axios.post('/api/register', form);
        console.log(f);

        if (f.data.success === undefined) {
            alert('There was an error creating your account');
            return;
        }

        if (f.data.success !== true){
            alert('There was an error creating your account');
            return;
        }

        const sign = await signIn('credentials', { redirect: false, username: form.username, password: form.password });

        if (sign.error == null){
            Router.push('/dashboard');
        } else {
            alert('There was an error creating your account');
        }

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
                <p className='text-white font-semibold text-xl w-fit m-auto'>Register</p>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Name *</p>
                    <input type="text" name="name" value={form.name} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Email *</p>
                    <input type="email" name="email" value={form.email} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Username *</p>
                    <input type="text" name="username" value={form.username} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Password *</p>
                    <input type="password" name="password" value={form.password} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-medium text-sm'>Confirm password *</p>
                    <input type="password" name="confirmpassword" value={form.confirmpassword} onChange={updateForm}
                    className='px-2 py-1 outline-none rounded-md border border-dg-300 text-white bg-dg-100' />
                </div>
                <GBtn onClick={submitForm}>Submit</GBtn>
                <Link href="/login" className='text-white text-sm flex items-center gap-2 hover:text-white/80'><HiChevronLeft /> Click here to login</Link>
            </div>
          </div>
        </div>
    )
}