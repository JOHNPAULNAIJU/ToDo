import React, { useEffect, useState } from 'react';
import './Todo.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, IconButton, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import db, { auth } from './firebase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Pending() {
    const [dialog, setDialog] = useState(false);
    const [loading, setloading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClick = (id) => {
        setOpen(true);
        var d = new Date();
        var n = d.toDateString();
        db.collection(auth.currentUser.email).doc(id).update({
            timestamp:n,
            status:'completed'
        });
    };
    const handleClose = (event, reason) => {if (reason === 'clickaway') {return;}setOpen(false);};
    function Alert(props) {return <MuiAlert elevation={6} variant="filled" {...props} />;}

    useEffect(()=>{
        const tod = db.collection(auth.currentUser.email).where("status", "==", "pending").orderBy('timestamp','asc').onSnapshot(snap=>{
            setTasks(snap.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })));
            setloading(false);
        });
        return ()=>{
            tod();
        }
    });

    function createTask(e){
        e.preventDefault();
        const text = document.getElementById('task-name').value;
        var d = new Date();
        var n = d.toDateString();
        db.collection(auth.currentUser.email).add({
            task:text,
            timestamp: n,
            status:'pending'
        });
        document.getElementById('task-name').value = '';
    }

    function delet(id){
        db.collection(auth.currentUser.email).doc(id).delete();
    }

    return (
        <div id="pending-body">
            { loading && <LinearProgress /> }
            {tasks.filter(obj=> obj.id !== 'profile').map(f1=>(
            <Card key={f1.id} id={f1.id} className="content">
                <CardContent> 
                    <Typography className="cont-name">{f1.data.task}</Typography>
                    <IconButton id="del-icon" onClick={()=>{delet(f1.id)}}><DeleteIcon></DeleteIcon></IconButton>
                    <FormGroup className="ch-box" id={f1.id} onClick={()=>{handleClick(f1.id)}}><FormControlLabel control={<Checkbox />}/></FormGroup>
                    <Typography id="time">{f1.data.timestamp}</Typography>
                </CardContent>
            </Card>
            ))} 
            {dialog && <Dialog open={dialog} id="dialog">
                <DialogTitle><Typography id="dia-title">ADD TASK</Typography></DialogTitle>
                <DialogContent>
                    <TextField autoFocus label="Task name" type="text" autoComplete="off" id="task-name"/>
                </DialogContent>
                <DialogActions>
                    <Button id="dia-bt" onClick={(e)=>{createTask(e)}}>Create</Button>
                    <Button id="dia-bt" onClick={()=>{setDialog(false);}}>Close</Button>
                </DialogActions>
            </Dialog>}
            <Fab size="small" id="newtask-bt" onClick={()=>{setDialog(true);}}><AddIcon/></Fab>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">Hurray! You completed the task 🎉</Alert>
            </Snackbar>
        </div>
    )
}

export default Pending;