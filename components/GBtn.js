import React from 'react';

export default function GBtn({ onClick, children }){

    return (
        <button
            className='grad text-lg px-2 py-1 rounded-sm text-white font-medium bg-black'
            onClick={onClick}>
            {children}
        </button>
    );
}