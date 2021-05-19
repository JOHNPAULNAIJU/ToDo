import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { IconButton, Typography, Button } from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Pending from './Pending';
import Completed from './Completed';
import db,{ auth } from './firebase';
import InputBase from '@material-ui/core/InputBase';
import './App.css';
 
function ToDo() {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {setValue(newValue);};
    const [sector, setSector] = useState(true);
    const [sector2, setSector2] = useState(false);
    const [prof, setProf] = useState(false);
    const [to, setTo] = useState(true);
    const dp = localStorage.getItem('dp');
    const name = localStorage.getItem('name');
    const [del, setdel] = useState([]);
    const [ss, setss] = useState(false);
    const [sss, setsss] = useState(true);

    function deleet(){
        db.collection(auth.currentUser.email).onSnapshot(snap => {
            setdel(snap.docs.map(doc=>({
                id: doc.id,
            })));
        })
        del.filter(obj=> obj.id !== 'profile').map(f1 =>(
            db.collection(auth.currentUser.email).doc(f1.id).delete()
        ))
    }
    function logout(){
        auth.signOut();
    }
    function delacc(){
        db.collection(auth.currentUser.email).get().then(res => {
            res.forEach(element => {
                element.ref.delete();
            });
        });
        auth.signOut();
    }

    function search() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search-input");
        filter = input.value.toUpperCase();
        table = document.getElementById("pending-body");
        tr = table.getElementsByClassName("content");
        for (i = 0; i < tr.length; i++){
            td = tr[i].getElementsByClassName("cont-name")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    return (
    <>
    {to && <div id="todo-body">
        <AppBar>
            {sss && <>
            <IconButton id="g1" onClick={()=>{setProf(true);setTo(false);}}><img src={dp} id="dp" alt=""/></IconButton>
            <Typography id="title4">ToDo</Typography>
            <IconButton id="g2" onClick={()=>{setss(true);setsss(false);}}><SearchSharpIcon id="search-icon"></SearchSharpIcon></IconButton>
            </>}
            {ss && <>
            <IconButton onClick={()=>{setsss(true);setss(false);}} style={{color:"#fff"}}><ArrowBackIcon /></IconButton>
            <InputBase placeholder="Search" id="search-input" onChange={search}/>   
            </>}
        </AppBar><AppBar>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="PENDING" onClick={()=>{
                    setSector(true);
                    setSector2(false);
                    }}/>
                <Tab label="COMPLETED" onClick={()=>{
                    setSector(false);
                    setSector2(true);
                    setsss(true);
                    setss(false);
                }}/>
            </Tabs>
        </AppBar>
        {sector && <section id="section1">
            <Pending />
        </section>}
        {sector2 && <section id="section2">
            <Completed />
        </section>}
    </div>}
    {prof && <div id="profile-body">
        <AppBar>
            <IconButton onClick={()=>{setProf(false);setTo(true);}} style={{color:'#fff'}}><ArrowBackIcon></ArrowBackIcon></IconButton> 
            <Typography id="pp">Profile</Typography>
        </AppBar>
        <section id="profile-section">
            <div id="sect1">
                <img src={dp} id="dpp" alt=""/>
                <Typography id="name">{name}</Typography>
                <br />
                <Button id="edit" onClick={()=>{window.location.href='https://myaccount.google.com/personal-info'}}>EDIT PROFILE</Button>
            </div>
            <div id="sect2">
                <Button id="btt" onClick={deleet}><p style={{width:'10px'}}></p><BackspaceIcon/><p style={{width:'30px'}}></p>CLEAR ALL TASKS</Button>
                <Button id="btt" onClick={logout}><p style={{width:'10px'}}></p><ExitToAppIcon /><p style={{width:'30px'}}></p>LOGOUT</Button>
                <Button id="btt" onClick={delacc}><p style={{width:'10px'}}></p><DeleteForeverIcon/><p style={{width:'30px'}}></p>DELETE ACCOUNT</Button>
            </div>
        </section>
    </div>}
    </>
    ) 
}

export default ToDo;