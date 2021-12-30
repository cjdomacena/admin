import React, { useState } from 'react'
import { handleSignupWithEmailPassword } from '../../hooks/handleAuth'
import { Dialog } from '@headlessui/react';
import { Loading } from './../../components/utils/Loading'
import { Link } from 'react-router-dom';

export const Signup = () => {

    let dialogItems = {
        title: 'Something went wrong...',
        description: 'Hello!',
        color: 'text-orange-400'

    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState(dialogItems)
    const [loading, setLoading] = useState(false);
    const [isValidPw, setIsValidPw] = useState(true);
    const [message, setMessage] = useState([])
    const [isMatching, setIsMatching] = useState(true);
    const [errorPwMatch, setErrorPwMatch] = useState('')
    const handleSignin = async () => {

        if (isValidPw && password.length > 0) {
            setLoading(true);
            const res = await handleSignupWithEmailPassword(email, password);
            if (res.status === 400) {
                dialogItems.title = 'Failed to signup';
                dialogItems.description = res.message;
            }
            if (res.status === 200) {
                dialogItems.title = 'Signup Successful! ';
                dialogItems.description = res.message;
                dialogItems.color = 'text-green-600';
            }

            setDialogContent(dialogItems);
            setIsOpen(true);
            resetForm();
            setInterval(() => {
                setLoading(false);
            }, 1000)

        }

    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    const showWarningMessage = (message, key = 0) => {
        return <p className='text-xs text-red-500' key={key}>{message}</p>
    }
    const validatePassword = (_event) => {
        let temp = []
        const upperCaseRegex = new RegExp('([A-Z])'); //Check for uppercase
        const digitRegex = new RegExp('([0-9])'); // Check for num
        if ((_event.target.value).length < 8) {
            temp.push(`Password too short (Min. 8 characters)`)
        }
        if (!upperCaseRegex.test(_event.target.value)) {
            temp.push('Password must contain at least one Uppercase letter')
        }

        if (!digitRegex.test(_event.target.value)) {
            temp.push('Password must contain at least one digit');
        }
        if (temp) {
            setMessage(temp);
            setIsValidPw(false);
        }
        if (temp.length === 0) {
            setIsValidPw(true);
            setMessage([]);
        }


    }

    const checkPasswordMatch = (_event) => {
        if (_event.target.value !== password) {
            setIsMatching(false)
            setErrorPwMatch('Password must match')
        } else {
            setIsMatching(true);
            setErrorPwMatch('')
        }
    }

    return (
        <div className='w-screen h-screen  flex justify-between'>
            <section className='lg:w-2/5 xl:w-2/5 md:w-3/5 sm:w-4/5 xs:w-4/5 h-full bg-slate-900 grid place-items-center'>
                <div className='w-4/5 mx-auto h-auto'>
                    <form className='space-y-8' onSubmit={(e) => {
                        e.preventDefault();
                        handleSignin();
                    }}>
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
                                validatePassword(e);
                            }} required />
                            {!isValidPw && message.map((mes, key) => showWarningMessage(mes, key))}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password" className='text-slate-50 text-sm'>Confirm Password</label>
                            <input type="password" className='w-full px-2 py-1 rounded text-sm' name="password" value={confirmPassword} onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                checkPasswordMatch(e);
                            }} required />

                            {!isMatching && showWarningMessage(errorPwMatch)}
                        </div>
                        <div className='space-x-2 text-sm'>
                            <button type='submit' className='text-gray-50 px-4 py-1 bg-blue-700 hover:bg-blue-900' disabled={loading} type="submit">Sign in</button>
                            <button className='text-gray-50 px-4 py-1 bg-slate-400 hover:bg-slate-600'><Link to="/">Cancel</Link></button>
                        </div>
                    </form>
                </div>
            </section>
            <section className='w-full h-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 bg-no-repeat bg-blend-luminosity bg-center' style={{ background: `url('https://images.unsplash.com/photo-1542553458-79a13aebfda6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1323&q=80')` }}>

            </section>
            <Dialog open={isOpen}
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto bg-slate-900 bg-opacity-80 flex justify-center items-center rounded-tl rounded-tr"
                onClose={() => setIsOpen(false)}
            >
                <Dialog.Overlay className="fixed inset-0" />
                <div className='bg-slate-100 w-96 h-auto rounded'>
                    <div>
                        <div className={`px-4 py-2 text-base ${dialogContent.color} rounded-tl rounded-tr bg-slate-100 shadow-sm font-semibold`}>
                            <Dialog.Title>
                                {dialogContent.title}
                            </Dialog.Title>
                        </div>
                        <Dialog.Description as="p" className="px-4 py-2 text-sm border max-h-24">{dialogContent.description}</Dialog.Description>
                    </div>
                </div>
            </Dialog>

            {loading && <Loading />}
        </div>
    )
}
