import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import db, { auth, provider } from './firebase';

function Login() {

    function createProfile(){
        try{
            const query = db.collection(auth.currentUser.email).doc('profile');
            query.get().then((doc) => {
                if(!doc.exists){
                    db.collection(auth.currentUser.email).doc('profile').set({
                        name: auth.currentUser.displayName,
                        profilepic: auth.currentUser.photoURL, 
                    });
                }    
            });
        }catch(err){}
    }
    
    return (
        <div id="login-body">
            <Typography id="title1">Get Started Quickly and Easily!</Typography>
            <Button id="login-bt" onClick={()=>{auth.signInWithPopup(provider).then(()=>{createProfile();}).catch((err)=>{});}}>GET STARTED</Button>
            <Typography id="title2">from</Typography>
            <Typography id="title3">JOHN PAUL NAIJU</Typography> 
        </div>
    )
}
 
export default Login;