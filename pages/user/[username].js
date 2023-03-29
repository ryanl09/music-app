import React from 'react';
import Content from '@/components/Content';
import axios from 'axios';
import query from '@/lib/db';

export default function User({info}){

    return (
        <Content></Content>
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
        const accountTags = getAccountTags(userId);
        const musicTags = getMusicTags(userId);

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
        INNER JOIN accountTags ON accountTags.id = userAccountTags.tagId
        WHERE userAccountTags.userId = ?`;

        const vals = [parseInt(userId, 10)];
        const result = await query(sql, vals);
        if (result.error){
            return result;
        }

        return [];
    }

    async function getMusicTags(userId){
        const sql = `SELECT musicTags.tagName
        FROM userMusicTags
        INNER JOIN musicTags ON accountTags.id = userMusicTags.tagId
        WHERE userMusicTags.userId = ?`;

        const vals = [parseInt(userId, 10)];
        const result = await query(sql, vals);
        if (result.error){
            return result;
        }

        return [];
    }

    if (username === undefined){
        username = 'ryan';
    }
    const userId = await getUserId(username);

    console.log(userId);
    const info = await getUserInfo(userId);

    console.log(info);


    return {
        props: {
            info: []
        }
    }
}