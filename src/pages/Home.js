import React, {useState, useEffect} from 'react'
import { supabase } from '../client/supabaseClient';

export const Home = () => {
const [user, setUser] = useState();
const getUser = () => {
    let temp = supabase.auth.user();
    setUser(temp);
}

    useEffect(() => {
        getUser();
    }, [user])

    return (
        <div>
            {console.log(user)}
        </div>
    )
}
