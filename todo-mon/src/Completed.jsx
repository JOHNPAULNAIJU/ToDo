import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './Todo.css';
import db, { auth } from './firebase';
import LinearProgress from '@material-ui/core/LinearProgress';

function Completed() {

    const [tasks, setTasks] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        const tod = db.collection(auth.currentUser.email).where("status", "==", "completed").orderBy('timestamp','asc').onSnapshot(snap=>{
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

    return (
        <div id="completed-body">
            { loading && <LinearProgress /> }
            {tasks.filter(obj=> obj.id !== 'profile').map(f1=>(
            <Card key={f1.id} id={f1.id}>
                <CardContent> 
                    <Typography>{f1.data.task}</Typography>
                    <IconButton id="del-icon" onClick={()=>{
                        db.collection(auth.currentUser.email).doc(f1.id).delete();
                    }}><DeleteIcon></DeleteIcon></IconButton>
                    <Typography id="time">Completed no: {f1.data.timestamp}</Typography>
                </CardContent>
            </Card>
            ))}
        </div>
    )
}

export default Completed;