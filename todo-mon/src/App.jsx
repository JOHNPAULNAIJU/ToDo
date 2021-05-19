import React, { useState,  useEffect} from 'react';
import './App.css';
import Login from './Login';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToDo from './ToDo';
import { auth } from './firebase';

function App() {

  const [loading, setLoading] = useState(true);
  const [user1, setUser] = useState(false);

  useEffect(()=>{
    auth.onAuthStateChanged(authStateObserver);
    const x = document.getElementsByTagName("BODY")[0];
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      console.log('ToDo-Mon');
    }else{
      x.remove();
      alert('Use the app in mobile');
    }
  });

  function authStateObserver(user){
    if(user){setLoading(false);setUser(true);
      localStorage.setItem('dp', auth.currentUser.photoURL);
      localStorage.setItem('name', auth.currentUser.displayName);
    }else{setLoading(false);setUser(false)
    }
  }
  
  return (
    <div id="App">
      {loading && <div id="loading-body"><CircularProgress /></div>}
      {user1 ? <ToDo /> : <Login />}
    </div>
  );
}
 
export default App;