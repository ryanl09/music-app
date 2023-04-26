import React, { useState } from 'react';
import Content from '@/components/Content';
import axios from 'axios';
import query from '@/lib/db';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { AiOutlineMail } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import Modal from '@/components/Modal';

export default function User({info}){

    const [showing, setShowing] = useState(false);

    const router = useRouter();
    let { username } = router.query;
    if(username===undefined){
        username='ryan';
    }

    const showModal = () => {
        setShowing(true);
    }

    const hideModal = () => {
        setShowing(false);
    }
    
    return (
        <Content>

            <Modal onHide={hideModal} showing={showing} title="Send Message">
                <div className="flex gap-2 flex-col justify-center">
                    <input type="text" placeholder="Enter message..." className='text-black px-2 py-1 rounded-md outline-none' />
                    <button className='px-2 py-1 bg-green --bg rounded-md hover:bg-green-h' onClick={hideModal}>Send</button>
                    
                </div>
            </Modal>

            <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                    <div className='max-w-[80px] max-h-[80px]'>
                        <Image src={info.image ?? 'https://api.tecesports.com/images/general/user.png'} 
                        className='rounded-full' width="80" height="80" alt="User" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-3'>
                            <h1 className='text-white text-xl font-medium'>{username}</h1>
                            <MdVerified className='text-green'/>
                        </div>
                        <h2 className='text-white/70 text-base font-medium'>{info.email}</h2>
                    </div>
                </div>
                
                <div className='text-white ml-auto flex items-center gap-2'>
                    <button className='flex bg-blue items-center gap-2 rounded-md px-4 py-2 hover:bg-blue-h --bg'
                        onClick={showModal}><AiOutlineMail />Contact</button>
                    <button className='flex bg-green items-center gap-2 rounded-md px-4 py-2 hover:bg-green-h --bg'><FiSend />Submit Track</button>
                </div>
            </div>
            <div className='flex flex-col gap-2 mt-4 mb-4'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <p className='text-white font-semibold text-lg'>Account Tags</p>
                        <div className='flex items-center gap-2'>
                        {info.tags.account !== undefined && info.tags.account.map(e => {
                            return (<div key={`${e}`} className='px-3 bg-gr text-white rounded-md'>{e}</div>);
                        })}
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div>
                        <p className='text-white font-semibold text-lg'>Music Tags</p>
                        <div className='flex items-center gap-2'>
                        {info.tags.music !== undefined && info.tags.music.map(e => {
                            return (<div key={`${e}`} className='px-3 bg-gr text-white rounded-md'>{e}</div>);
                        })}
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <p className='text-white font-semibold text-lg'>Featured tracks</p>
            <div className='h-[1px] w-[200px] my-1 mb-2 bg-white'></div>
            {username === 'ryan' && (
                <div className='flex flex-col gap-4'>
                    <iframe width="100%" height="152" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="https://open.spotify.com/embed/track/6CtP1XWSOOvqTLYMiUshoO?utm_source=generator"></iframe>
                    <iframe width="100%" height="152" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="https://open.spotify.com/embed/track/5gGtZ5r8Mv2XOqdyJyc3Fd?utm_source=generator"></iframe>
                    <iframe width="100%" height="152" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="https://open.spotify.com/embed/track/4VjMRlEoBxohcNLpxlcvUt?utm_source=generator"></iframe>
                </div>
            )}
        </Content>
    );
}

export async function getServerSideProps(context){
    let { username } = context.query;
        
    async function getUserId(username){
        const sql = 'SELECT id FROM users WHERE LOWER(username) = ?';
        const vals = [username.toLowerCase()];

        const result = await query(sql, vals);

        if (result.error){
            return result;
        }

        return result[0];
    }

    async function getUserEmail(userId){
        const sql='SELECT email FROM users WHERE id = ?';
        const vals = [parseInt(userId, 10)];
        const result = await query(sql, vals);
        if (result.error){
            return result;
        }

        return {
            email: result[0].email
        };
    }

    async function getUserInfo(userId){
        const accountTags = await getAccountTags(userId);
        const musicTags = await getMusicTags(userId);
        const email = await getUserEmail(userId);

        return {
            image: 'https://api.tecesports.com/images/general/user.png',
            email: email.email,
            tags: {
                account: accountTags,
                music:musicTags
            }
        }
    }

    async function getAccountTags(userId){
        const sql = `SELECT accountTags.tagName
        FROM userAccountTags
        INNER JOIN accountTags ON accountTags.id = userAccountTags.accountTagId
        WHERE userAccountTags.userId = ?
        ORDER BY accountTags.tagName`;

        const vals = [parseInt(userId, 10)];
        const result = await query(sql, vals);
        if (result.error){
            return result;
        }

        const res = [];
        result.forEach(e=>{
            res.push(e.tagName);
        })

        return res;
    }

    async function getMusicTags(userId){
        const sql = `SELECT musicTags.tagName
        FROM userMusicTags
        INNER JOIN musicTags ON musicTags.id = userMusicTags.musicTagId
        WHERE userMusicTags.userId = ?
        ORDER BY musicTags.tagName`;

        const vals = [parseInt(userId, 10)];
        const result = await query(sql, vals);
        if (result.error){
            return result;
        }

        const res=[];
        result.forEach(e =>{
            res.push(e.tagName);
        });

        return res;
    }

    if (username === undefined){
        username = 'ryan';
    }
    const userId = await getUserId(username);
    const info = await getUserInfo(userId.id);


    return {
        props: {
            info: info
        }
    }
}