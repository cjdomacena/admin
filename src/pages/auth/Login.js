import React, { useState } from 'react'
import { handleSigninWithEmailPassword } from '../../hooks/handleAuth';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
export const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSignin = async () => {
        setLoading(true);
        const res = await handleSigninWithEmailPassword(email, password);
        
        if (res.status === 200) {
            navigate('/');
        }
        else if (res.status === 500) {
            toast.error(res.message);

        }
        setLoading(false);
                
    }

    return (
        <main className='w-screen h-screen flex justify-between'>

            <section className='lg:w-2/5 xl:w-2/5 md:w-3/5 sm:w-4/5 xs:w-4/5 h-full bg-slate-900 grid place-items-center'>
                <div className='w-4/5 mx-auto h-auto'>
                    <form className='space-y-8' onSubmit={(e) => {
                        e.preventDefault();
                        handleSignin()
                    }} >
                        <div className='space-y-1'>
                            <label htmlFor="email" className='text-slate-50 text-sm'>Email Address</label>
                            <input type="email" className='w-full px-2 py-1 text-sm rounded' name="email" value={email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} placeholder='john.doe@email.com' required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password" className='text-slate-50 text-sm'> Password</label>
                            <input type="password" className='w-full px-2 py-1 rounded text-sm' name="password" value={password} onChange={(e) => {
                                setPassword(e.target.value);
                            }} required />
                        </div>

                        <div className='space-x-2 text-sm flex'>
                            <button type='submit' className='text-gray-50 px-4 py-1 bg-blue-700 hover:bg-blue-900  flex transition-all' disabled={loading} type="submit">
                                {loading ?   <><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> Processing </>: 'Sign in'}
                              
    

                            </button>
                            <button className='text-gray-50 px-4 py-1 bg-slate-400 hover:bg-slate-600' onClick={() => navigate('/')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className='w-full h-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400'>

            </section>
            <Toaster />
        </main>
    )
}
