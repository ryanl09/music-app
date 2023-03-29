import React, {useState} from 'react';
import Content from '@/components/Content';
import GBtn from '@/components/GBtn';
import query from '@/lib/db';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import axios from 'axios';
import Image from 'next/image';
import { BiSearchAlt2 } from 'react-icons/bi';
import Link from 'next/link';

export default function Search({initialAccountTags, initialMusicTags}){

    const [aTags, setATags] = useState(JSON.parse(initialAccountTags));
    const [mTags, setMTags] = useState(JSON.parse(initialMusicTags));

    const [users, setUsers] = useState([]);

    function changeATagSelected(tagId) {
        const temp = Object.assign([], aTags);
        temp.forEach(e => {
            if (e.id === tagId){
                if(e.tagSelected === undefined){
                    e.tagSelected = true;
                    return;
                }
                e.tagSelected = !e.tagSelected;
            }
        })
        setATags(temp);
    }

    function changeMTagSelected(tagId) {
        const temp = Object.assign([], mTags);
        temp.forEach(e => {
            if (e.id === tagId){
                if(!e.tagSelected){
                    e.tagSelected = true;
                    return;
                }
                e.tagSelected = !e.tagSelected;
            }
        });
        setMTags(temp);
    }

    async function querySearch(){

        const sa = [];
        aTags.forEach(e =>{
            if(e.tagSelected){ sa.push(e.id); }
        })

        const sm = [];
        mTags.forEach(e =>{
            if(e.tagSelected) { sm.push(e.id) };
        })

        const res = await axios.post('/api/search', {
            accountTags: sa,
            musicTags: sm
        });

        const data = res.data;
        if(data.error){
            return;
        }

        const users = data.success;
        setUsers(users);
    }

    return (
        <Content>
            <div className='grid grid-cols-1 gap-2 text-white'>
                <div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-lg font-medium'>Search</h1>
                        <div className='flex flex-col gap-2 color-white'>
                            {/*<input type="text" className='px-2 py-1 rounded-md bg-dg-100 border border-dg-300' />*/}
                            <div>
                                <p>Account Tags:</p>
                                <div className='flex items-center gap-2'>
                                    {aTags.map(e => {
                                        let color = 'bg-dg-300 hover:bg-dg-400';
                                        let Icon = AiFillPlusCircle;
                                        if (e.tagSelected) {
                                            color = 'bg-blue hover:bg-blue-h';
                                            Icon = AiFillMinusCircle;
                                        }
                                        return <button key={e.id} className={`${color} rounded-md --bg flex items-center gap-2 px-2`} onClick={() => {changeATagSelected(e.id)}}><Icon />{e.tagName}</button>
                                    })}
                                </div>
                            </div>
                            <div>
                                <p>Music Tags:</p>
                                <div className='flex items-center gap-2'>
                                    {mTags.map(e => {
                                        let color = 'bg-dg-300 hover:bg-dg-400';
                                        let Icon = AiFillPlusCircle;
                                        if (e.tagSelected) {
                                            color = 'bg-blue hover:bg-blue-h';
                                            Icon = AiFillMinusCircle;
                                        }
                                        return <button key={e.id} className={`${color} rounded-md --bg flex items-center gap-2 px-2`} onClick={() => {changeMTagSelected(e.id)}}><Icon />{e.tagName}</button>
                                    })}
                                </div>
                            </div>
                            <div>
                                <button onClick={querySearch} className='bg-gr flex items-center gap-2 px-4 py-2 rounded-md'><BiSearchAlt2 /> Find users</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className='flex flex-col gap-2'>
                            {users.length > 0 && users.map(e => {
                                return (
                                    <Link href={`/user/${e.username}`} key={`user-${e.id}`} >
                                        <div className='flex gap-3 items-center --bg hover:bg-dg-200 rounded-md px-4 py-2 hover:cursor-pointer max-w-[400px]'>
                                            <div>
                                                <UImage />
                                            </div>
                                            {e.username}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        {users.length === 0 && (
                            <div className='text-xl py-3 text-white/90 font-medium'>No users found</div>
                        )}
                    </div>
                </div>
            </div>
        </Content>
    );
}

export async function getServerSideProps(context){
    let sql = 
    `SELECT accountTags.tagName, accountTags.id
    FROM accountTags`;
    const accountTags = await query(sql, []);

    accountTags.forEach(e => {
        e.tagSelected = false;
    });

    sql = 
    `SELECT musicTags.tagName, musicTags.id
    FROM musicTags`;
    const musicTags = await query(sql, []);

    musicTags.forEach(e => {
        e.tagSelected = false;
    });

    return {
        props: {
            initialAccountTags: JSON.stringify(accountTags),
            initialMusicTags: JSON.stringify(musicTags)
        }
    }
}

const UImage = () => {
    return (
        <div className='w-[40px] h-[40px]'>
            <Image src="https://api.tecesports.com/images/general/user.png" width="40" height="40" alt="User" className=' rounded-full' />
        </div>
    );
}