import {supabase} from '../client/supabaseClient'


export const handleSignupWithEmailPassword = async (email, password) => {
    const res = {message: '', status: 0};
    try {
        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error){
            throw error
        }else{
            res.message = 'Please check your email to confirm your email address.';
            res.status = 200;
        }
    } catch(error) {
        res.message = error.error.description || error.message;
        res.status = 400;
    }finally{
        return res;
    }
}