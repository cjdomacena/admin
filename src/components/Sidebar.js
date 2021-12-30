import React from 'react'
import {HomeIcon} from '@heroicons/react/outline'
import { OfficeBuildingIcon } from '@heroicons/react/outline'
import { CursorClickIcon } from '@heroicons/react/outline'
export const Sidebar = () => {

    return (
        <aside className='w-24  transition-all h-screen text-slate-800 duration-400 bg-slate-900 shadow-slate-100'>
            <div className='pt-8 text-white flex mx-auto font-bold items-center justify-center'>
                Sales<br/>Gravity
            </div>
            <div className='pt-12 shadow h-full '>
                
                <ul className='w-auto mx-auto flex flex-col space-y-8'>
                    <li className='text-slate-50 flex justify-center hover:border-r-4 py-2'><HomeIcon className='w-6 h-6'/></li>
                    <li className='text-slate-50 flex justify-center hover:border-r-4 py-2'><OfficeBuildingIcon className='w-6 h-6'/></li>
                </ul>
            </div>
        </aside>
    )
}
