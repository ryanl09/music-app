import React from 'react';

export default function GBtn({ onClick, children }){
    return (
        <button
            className='text-base px-4 py-2 rounded-md text-white font-medium grad'
            onClick={onClick}>
            {children}
        </button>
    );
}