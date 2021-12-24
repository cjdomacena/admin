import React, { useState } from 'react'
import { handleSignupWithEmailPassword } from '../../hooks/handleAuth'
import { Dialog } from '@headlessui/react';
import { Loading } from './../../components/utils/Loading'

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
    const handleSignin = async () => {
        setLoading(true);

        if (password !== confirmPassword) {
            dialogItems.title = 'Password must match!'
            dialogItems.description = 'Please try again!'
        } 
        const res = await handleSignupWithEmailPassword(email, password);
        if (res.status === 400) {
            dialogItems.title = 'Failed to signup';
            dialogItems.description = res.message;
        }
        if (res.status === 200) {
            dialogItems.title = 'Signup Successful! ';
            dialogItems.description = res.message;
            dialogItems.color = 'text-green-400';
        }

        setDialogContent(dialogItems);
        setIsOpen(true);
        resetForm();
        setInterval(() => {
            setLoading(false);
        }, 1000)
        return false;
    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    const showWarningMessage = (message, key) => {
        return <p className='text-xs text-red-500' key={key}>{message}</p>
    }
    const validatePassword = (_event) => {
        let temp = []
        const upperCaseRegex = new RegExp('([A-Z])');
        const digitRegex = new RegExp('([0-9])');
        let errorCount = 0;
        if((_event.target.value).length < 8){
            temp.push(`Password too short (Min. 8 characters)`)
        }
        if(!upperCaseRegex.test(_event.target.value)){
            temp.push('Password must contain at least one Uppercase letter')
        }

        if(!digitRegex.test(_event.target.value)){
            temp.push('Password must contain at least one digit');
        }
        if(temp)
        {
            setMessage(temp);
            setIsValidPw(false);
        }else{
            setIsValidPw(true);
        }
        
    }



    return (
        <div className='w-screen h-screen  flex justify-between'>
            <section className='lg:w-2/5 xl:w-2/5 md:w-3/5 sm:w-4/5 xs:w-4/5 h-full bg-slate-900 grid place-items-center'>
                <div className='w-4/5 mx-auto h-auto'>
                    <form className='space-y-8' onSubmitCapture={handleSignin} >
                        <div className='space-y-1'>
                            <label htmlFor="email" className='text-slate-50'>Email Address</label>
                            <input type="email" className='w-full px-2 py-1 text-sm rounded' name="email" value={email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} placeholder='john.doe@email.com' required/>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password" className='text-slate-50'> Password</label>
                            <input type="password" className='w-full px-2 py-1 rounded text-sm' name="password" value={password} onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e);
                            }}  required/>
                             {!isValidPw && message.map((mes,key) => showWarningMessage(mes,key))}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password" className='text-slate-50'>Confirm Password</label>
                            <input type="password" className='w-full px-2 py-1 rounded text-sm' name="password" value={confirmPassword} onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }} required/>

                           
                        </div>
                        <div className='space-x-2 text-sm'>
                            <button className='text-gray-50 px-4 py-1 bg-slate-400 hover:bg-slate-600'>Cancel</button>
                            <button  type='submit'  className='text-gray-50 px-4 py-1 bg-blue-700 hover:bg-blue-900'disabled={loading}>Sign in</button>
                        </div>
                    </form>
                </div>
            </section>
            <div className='flex-shrink h-full bg-gradient-to-r from-sky-500 to-indigo-500'>

            </div>
            <Dialog open={isOpen}
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto bg-slate-900 bg-opacity-80 flex justify-center items-center rounded-tl rounded-tr"
                onClose={() => setIsOpen(false)}
            >
                <Dialog.Overlay className="fixed inset-0" />
                <div className='bg-slate-100 w-96 h-auto rounded'>
                    <div>
                        <div className={`p-2 text-base ${dialogContent.color} rounded-tl rounded-tr bg-slate-100 shadow-sm`}>
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
