import React, {useState} from 'react';
import { BiX } from 'react-icons/bi';

export default function Modal({children, showing, onHide, title}) {

    function hide(){
        onHide();
    }

    return (
        <div className={`bg-black/70 z-50 fixed left-0 w-full h-full right-0 top-0 bottom-0 text-white items-center ${showing ? 'flex' : 'hidden'}`}>
            <div className='w-[90%] h-[90%] md:w-[600px] md:h-[400px] p-4 relative bg-dg-200 min-w-[100px] min-h-[100px] rounded-md m-auto'>
                <div className='w-full flex items-center'>
                    <h2>{title}</h2>
                    <BiX onClick={hide} className="ml-auto hover:bg-white/10 text-2xl hover:cursor-pointer rounded-md text-white" />
                </div>
                <div className='mt-4 max-h-[320px] overflow-y-auto modal-box-body'>
                    {children}
                </div>
            </div>
        </div>
    );
}