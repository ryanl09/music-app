import SideNav from "./SideNav";
import React from 'react';

export default function Content({children}) {

    return (
        <div className="grid grid-cols-main [&>div]:h-[100vh]">
            <SideNav />
            <div className="px-4 py-4">
                {children}
            </div>
        </div>
    );
}