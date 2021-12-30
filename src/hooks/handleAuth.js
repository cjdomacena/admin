import {supabase} from '../client/supabaseClient'


export const handleSignupWithEmailPassword = async (email, password) => {
    const res = {message: '', status: 0};
    try {
        const { error } = await supabase.auth.signUp({
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

export const handleSigninWithEmailPassword = async (email, password) => {
    const res = {message: '', status: 0};
    try {
        const { user,error } = await supabase.auth.signIn({
            email: email,
            password: password
        })

        if (error){
            throw error
        }
        res.status = 200;
        return res;
    } catch(error) {
        res.message = error.error_description || error.message;
        res.status = 500;
        return res;
    }
}

export const handleLogout = async () => {
    supabase.auth.signOut();
  
}