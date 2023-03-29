import React, { useState, useEffect } from 'react';
import Content from '@/components/Content';
import GBtn from '@/components/GBtn';
import { AiOutlineLock, AiOutlineUnorderedList } from 'react-icons/ai';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function Subscribe(){

    const { data:session, status } = useSession();
    const [subStatus, setSubStatus] = useState(false);

    useEffect(() =>{
        if (session===undefined){
            return;
        }

        const { id }  = session.user;
        if(id === undefined){
            return;
        }

        axios.get(`/api/subscribe?action=getSubscription&userId=${id}`).then(data => {
            if(data.error){
                return;
            }
            setSubStatus(data.data.isSubscribed);
        });
    }, [session]);

    async function addSub() {
        if (session === undefined){
            return;
        }

        const { id } = session.user;
        const res = await subscribe(id);
        
        if(res.error){
            return;
        }

        if (res.status){
            setSubStatus(true);
        }
    }

    async function remSub() {
        if (session === undefined){
            return;
        }

        const { id } = session.user;
        const res = await removeSubscribe(id);

        if (res.error){
            return;
        }

        if (res.status){
            setSubStatus(false);
        }
    }

    return (
       <Content>
        <h1 className='text-lg font-medium text-white'>Subscriptions</h1>
            <div className='flex items-center justify-center [&>*]:rounded-md h-full text-white'>
                <div className='bg-dg-200 px-8 py-3 pr-12 mr-[-6px] shadow'>
                    <h2 className='text-2xl font-semibold text-white'>Free User</h2>
                    <p className='mb-2 font-medium'>$0 / month</p>
                    <p>Includes:</p>
                    <ul className='mb-8'>
                        <li><Disc /> Message users</li>
                        <li><Disc /> Share tracks</li>
                        <li><Disc /> Search users</li>
                    </ul>

                    {subStatus ? (
                        <div className=" text-center">
                            <button className='justify-center w-full text-base px-4 py-2 rounded-md text-white font-medium bg-gr flex gap-2 items-center' onClick={remSub}><BiPurchaseTagAlt />Subscribe</button>
                        </div>
                    ) : (
                        <div className=" text-center">
                            <button className='justify-center w-full text-base px-4 py-2 rounded-md text-white font-medium bg-dg-300 cursor-not-allowed flex gap-2 items-center'><AiOutlineLock /> Current Plan</button>
                        </div>
                    )}

                </div>
                <div className='bg-gr px-8 py-6 z-[2] side-shadow'>
                    <h2 className='text-2xl font-semibold text-white'>Subscribed User</h2>
                    <p className='mb-2 font-medium'>$5 / month</p>
                    <p>Includes:</p>
                    <ul className='mb-8'>
                        <li><Disc /> Message users</li>
                        <li><Disc /> Share tracks</li>
                        <li><Disc /> Search users</li>
                        <li><Disc /> Profile track upload</li>
                        <li><Disc /> Priority messaging</li>
                        <li><Disc /> AI tools</li>
                    </ul>
                    

                    {subStatus ? (
                        <div className=" text-center">
                            <button className='justify-center w-full text-base px-4 py-2 rounded-md text-white font-medium bg-dg-300 cursor-not-allowed flex gap-2 items-center'><AiOutlineLock /> Current Plan</button>
                        </div>
                    ) : (
                        <div className=" text-center">
                            <button className='justify-center w-full text-base px-4 py-2 rounded-md text-white font-medium bg-dg-200 hover:bg-dg-300 --bg mx-auto flex items-center gap-2' onClick={addSub}><BiPurchaseTagAlt />Subscribe</button>
                        </div>
                    )}
                </div>
                <div className='bg-dg-200 px-8 py-3 pl-12 ml-[-6px] shadow'>
                    <h2 className='text-2xl font-semibold text-white mb-2'>Account Boost</h2>
                    <p>Includes:</p>
                    <ul className='mb-8'>
                        <li><Disc /> Profile boost</li>
                        <li><Disc /> Track boost</li>
                        <li>&nbsp;</li>
                    </ul>
                    <button className='justify-center w-full flex items-center gap-2 bg-gr px-4 py-2 rounded-md font-medium'><AiOutlineUnorderedList />Options</button>
                </div>
            </div>
       </Content>
    );
}

const Disc = () => {
    return (
        <span className='mr-2'>•</span>
    );
}

async function subscribe(userId){
    const d = await axios.post('/api/subscribe', {
        action:'addSubscription',
        userId: userId
    });

    return d.data;
}

async function removeSubscribe(userId){
    const d = await axios.post('/api/subscribe', {
        action:'removeSubscription',
        userId: userId
    });

    return d.data;
}