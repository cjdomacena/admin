import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './../client/supabaseClient'
import { Menu } from '@headlessui/react'
const Header = () => {
    const [user, setUser] = useState();
    const [session, setSession] = useState(null);
    const getUser = () => {
        let temp = supabase.auth.user();
        setUser(temp);
        setSession(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <header className='w-full bg-slate-900 fixed '>
            <nav className='container mx-auto p-4 flex justify-between items-center'>
                <div className='text-gray-50'>
                    SalesGravity
                </div>
                <ul className='text-white'>
                    {session ?
                        <Account user={user} /> :
                        <div className='flex space-x-2 items-center justify-center'>
                            <li className='text-sm'><Link to="/login">Log in</Link></li>
                            <li>|</li>
                            <li className='text-xs'>Don't have an account? <Link to="/signup" className='px-4 py-1 bg-blue-600 ml-1 text-sm'>Sign Up</Link></li>
                        </div>
                    }
                </ul>
            </nav>
        </header>
    )
}


const Account = ({ user }) => {
    return (
        <Menu as="div" className="relative rounded px-4 py-1 bg-slate-800">
            <Menu.Button className="text-sm">
                {user.email}
            </Menu.Button>
            <Menu.Items as="ul" className="absolute top-12 left-0 bg-slate-800 w-48 p-2 space-y-2 rounded ring-0">
                <Menu.Item as="li" className='text-sm text-red-500 w-full hover:bg-slate-700 p-2 rounded-sm'>
                    <button onClick={() => supabase.auth.signOut()}>Logout</button>
                </Menu.Item>
            </Menu.Items>

        </Menu>
    )
}

export default Header
