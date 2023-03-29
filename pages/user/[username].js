import React from 'react';
import Content from '@/components/Content';
import axios from 'axios';
import query from '@/lib/db';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';

export default function User({info}){

    const router = useRouter();
    let { username } = router.query;
    if(username===undefined){
        username='ryan';
    }
    

    return (
        <Content>
            <div className='flex items-center'>
                <div>
                    <div className='max-w-[80px] max-h-[80px]'>
                        <Image src={info.image ?? 'https://api.tecesports.com/images/general/user.png'} 
                        className='rounded-full' width="80" height="80" alt="User" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1>{username}</h1>
                    </div>
                </div>
                <div></div>
            </div>
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

    async function getUserInfo(userId){
        const accountTags = await getAccountTags(userId);
        const musicTags = await getMusicTags(userId);

        return {
            image: 'https://api.tecesports.com/images/general/user.png',
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

    console.log(info);


    return {
        props: {
            info: []
        }
    }
}