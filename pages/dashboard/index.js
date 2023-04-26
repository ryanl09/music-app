import React, { useState } from 'react';
import Content from '@/components/Content';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { getSession } from 'next-auth/react';
import query from '@/lib/db';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { BiStar } from 'react-icons/bi';
import Image from 'next/image';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

export default function Dashboard({initialAccountTags, initialMusicTags, username}) {
    const [accountTags, setAccountTags] = useState(JSON.parse(initialAccountTags));
    const [musicTags, setMusicTags] = useState(JSON.parse(initialMusicTags));

    const router = useRouter();

    async function addAccountTag(tagId) {
        const res = await axios.post('/api/dashboard', {
            action: 'addAccountTag',
            tagId: tagId,
            user: username
        });

        const data = res.data;

        if (data.error){
            alert(data.error);
            return;
        }

        let temp = Object.assign([], accountTags);
        temp.forEach(e => {
            if (e.id === tagId){
                e.tagExists = true;
            }
        })
        setAccountTags(temp);
    }

    async function removeAccountTag(tagId) {
        const res = await axios.post('/api/dashboard', {
            action: 'removeAccountTag',
            tagId: tagId,
            user: username
        });

        const data = res.data;

        if (data.error){
            alert(data.error);
            return;
        }

        let temp = Object.assign([], accountTags);
        temp.forEach(e => {
            if (e.id === tagId){
                e.tagExists = false;
            }
        })
        setAccountTags(temp);
    }

    async function addMusicTag(tagId) {
        const res = await axios.post('/api/dashboard', {
            action: 'addMusicTag',
            tagId: tagId,
            user: username
        });

        const data = res.data;

        if (data.error){
            alert(data.error);
            return;
        }

        let temp = Object.assign([], musicTags);
        temp.forEach(e => {
            if (e.id === tagId){
                e.tagExists = true;
            }
        })
        setMusicTags(temp);
    }

    async function removeMusicTag(tagId) {
        const res = await axios.post('/api/dashboard', {
            action: 'removeMusicTag',
            tagId: tagId,
            user: username
        });

        const data = res.data;

        if (data.error){
            alert(data.error);
            return;
        }

        let temp = Object.assign([], musicTags);
        temp.forEach(e => {
            if (e.id === tagId){
                e.tagExists = false;
            }
        })
        setMusicTags(temp);
    }

    return (
        <Content>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className='grid grid-cols-1 gap-2 text-white'>
                    <div>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-medium'>Account Tags</h1>
                        </div>
                        <div className='mt-2 h-[200px] border border-dg-300 rounded-md px-4 py-2'>
                            <div>
                                <p>Active</p>
                                <div className='grad w-[100px] h-[2px]' />
                                <div className='flex items-center gap-2 mt-2'>
                                    {accountTags.map(e => {
                                        if (e.tagExists){
                                            return (<button className='rounded-sm bg-blue px-2 text-sm py-1 hover:cursor-pointer flex items-center gap-2 --bg hover:bg-blue-h' onClick={() => {removeAccountTag(e.id)}} key={e.id}><AiFillMinusCircle />{e.tagName}</button>)
                                        }
                                    })}
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p>Available</p>
                                <div className='bg-white w-[100px] h-[2px]' />
                                <div className='flex items-center gap-2 mt-2'>
                                    {accountTags.map(e => {
                                        if (!e.tagExists){
                                            return (<button className='rounded-sm bg-dg-300 px-2 text-sm py-1 hover:cursor-pointer flex items-center gap-2 --bg hover:bg-dg-400' onClick={() => {addAccountTag(e.id)}} key={e.id}><AiFillPlusCircle />{e.tagName}</button>)
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-medium'>Music Tags</h1>
                        </div>
                        <div className='mt-2 border border-dg-300 rounded-md px-4 py-2'>
                            <div>
                                <p>Active</p>
                                <div className='grad w-[100px] h-[2px]' />
                                <div className='flex items-center gap-2 mt-2'>
                                    {musicTags.map(e => {
                                        if (e.tagExists){
                                            return (<button className='rounded-sm bg-blue px-2 text-sm py-1 hover:cursor-pointer flex items-center gap-2 --bg hover:bg-blue-h' onClick={() => {removeMusicTag(e.id)}} key={e.id}><AiFillMinusCircle />{e.tagName}</button>)
                                        }
                                    })}
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p>Available</p>
                                <div className='bg-white w-[100px] h-[2px]' />
                                <div className='flex items-center gap-2 mt-2 flex-wrap'>
                                    {musicTags.map(e => {
                                        if (!e.tagExists){
                                            return (
                                                <div key={e.id}>
                                                    <button
                                                        className='rounded-sm bg-dg-300 px-2 text-sm py-1 hover:cursor-pointer flex items-center gap-2 --bg hover:bg-dg-400'
                                                        onClick={() => {addMusicTag(e.id)}}>
                                                        <AiFillPlusCircle />{e.tagName}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-white'>
                    <div className='flex items-center'>
                        <h1 className='text-lg font-medium'>Messages</h1>
                    </div>
                    <div className='mt-2 h-[444px] border border-dg-300 rounded-md px-4 py-2'>
                        <div className='flex flex-col gap-2'>
                            
                            <div className=' border border-dg-200 rounded-md px-2 py-1'>
                                <div className='flex items-center'>
                                    <span>User 21</span>
                                    <BiStar className='ml-auto text-green' />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='' style={{
                                        backgroundImage: "url(https://api.tecesports.com/images/general/sound.png)",
                                        backgroundSize:'contain',
                                        width:'100%',
                                        height:'40px'
                                    }}>
                                    </div>
                                    <div className="flex flex-col gap-1 ml-auto">
                                        <button className='border border-dg-300 --bg hover:bg-dg-200 rounded-md px-2 py-1 flex items-center gap-2'><AiFillCheckCircle className='text-green'/>Approve</button>
                                        <button className='border border-dg-300 --bg hover:bg-dg-200 rounded-md px-2 py-1 flex items-center gap-2'><MdCancel className='text-red'/>Reject</button>
                                    </div>
                                </div>
                                <span className='text-white/70 text-sm uppercase font-medium float-right mt-2'>submitted january 10, 2023</span>
                            </div>
                            
                            <div className=' border border-dg-200 rounded-md px-2 py-1'>
                                <div className='flex items-center'>
                                    <span>User 513</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='' style={{
                                        backgroundImage: "url(https://api.tecesports.com/images/general/sound.png)",
                                        backgroundSize:'contain',
                                        width:'100%',
                                        height:'40px'
                                    }}>
                                    </div>
                                    <div className="flex flex-col gap-1 ml-auto">
                                        <button className='border border-dg-300 --bg hover:bg-dg-200 rounded-md px-2 py-1 flex items-center gap-2'><AiFillCheckCircle className='text-green'/>Approve</button>
                                        <button className='border border-dg-300 --bg hover:bg-dg-200 rounded-md px-2 py-1 flex items-center gap-2'><MdCancel className='text-red'/>Reject</button>
                                    </div>
                                </div>
                                <span className='text-white/70 text-sm uppercase font-medium float-right mt-2'>submitted april 23, 2023</span>
                            </div>

                            <div className=' border border-dg-200 rounded-md px-2 py-1'>
                                <div className='flex items-center'>
                                    <span>Ryan</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='' style={{
                                        backgroundImage: "url(https://api.tecesports.com/images/general/sound.png)",
                                        backgroundSize:'contain',
                                        width:'100%',
                                        height:'40px'
                                    }}>
                                    </div>
                                    <div className="flex flex-col gap-1 ml-auto">
                                        <button className='border border-dg-300 --bg hover:bg-dg-200 rounded-md px-2 py-1 flex items-center gap-2'><AiFillCheckCircle className='text-green'/>Approve</button>
                                        <button className='border border-dg-300 --bg hover:bg-dg-200 rounded-md px-2 py-1 flex items-center gap-2'><MdCancel className='text-red'/>Reject</button>
                                    </div>
                                </div>
                                <span className='text-white/70 text-sm uppercase font-medium float-right mt-2'>submitted april 13, 2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export async function getServerSideProps(context){

    const session = await getSession(context);

    if (session === null){
        return {
            redirect: {
                destination: '/login'
            }
        }
    }

    const username = session.user.name;

    let sql = 
    `SELECT accountTags.tagName, accountTags.id,
    CASE WHEN userAccountTags.accountTagId IS NULL THEN 0 ELSE 1 END AS tagExists
    FROM accountTags
    INNER JOIN users ON LOWER(users.username) = LOWER(?)
    LEFT JOIN userAccountTags ON accountTags.id = userAccountTags.accountTagId AND userAccountTags.userId = users.id`;
    let vals = [session.user.name];
    const accountTags = await query(sql, vals);


    sql = 
    `SELECT musicTags.tagName, musicTags.id,
    CASE WHEN userMusicTags.musicTagId IS NULL THEN 0 ELSE 1 END AS tagExists
    FROM musicTags
    INNER JOIN users ON LOWER(users.username) = LOWER(?)
    LEFT JOIN userMusicTags ON musicTags.id = userMusicTags.musicTagId AND userMusicTags.userId = users.id`;
    vals = [session.user.name];
    const musicTags = await query(sql, vals);


    //userid
    
    async function getUserId(username){
        const sql = 'SELECT id FROM users WHERE LOWER(username) = ?';
        const vals = [username.toLowerCase()];

        const result = await query(sql, vals);

        if (result.error){
            return result;
        }

        return result[0];
    }

    const userId = await getUserId(username);
    const { id } = userId;
    const convos = await loadConversations(id);

    /**convos */
    async function loadConversations(userId){
        const sql='SELECT `title` ';
        const vals=[parseInt(userId,10)];
    }

    return {
        props: {
            initialAccountTags: JSON.stringify(accountTags),
            initialMusicTags: JSON.stringify(musicTags),
            username:username
        }
    }
}