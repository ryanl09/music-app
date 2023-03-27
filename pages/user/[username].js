import React from 'react';
import Content from '@/components/Content';

export default function User(){
    return (
        <Content></Content>
    );
}

export async function getServerSideProps(context){
    return {
        props: {
            profileData: []
        }
    }
}