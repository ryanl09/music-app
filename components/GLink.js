import React from 'react';
import Link from 'next/link';

export default function GLink({ href, children }){
    return (
        <Link
            className='text-base px-8 py-2 rounded-sm text-white grad font-medium'
            href={href}>
            {children}
        </Link>
    );
}