import React, { useState } from 'react';
import fbase from './firebase';
import firebase from 'firebase';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function TaskForTeam({ task, listGroupTasks, team }) {
    const [status, setStatus] = useState(task.status);
    const [desc, setDesc] = useState(false);
    const user = fbase.auth().currentUser;

    const selectState = (task, value) => {
        const task_status = { [`${task.id}.status`]: value }
        fbase.firestore().collection('groups').doc(team.id).update(task_status).then(doc => {
            console.log("Update succeeded.")
            setStatus(value)
        }).catch(function (error) {
            console.log("Update failed: " + error.message);
            alert(`The task couldn't be updated!`);
        });

    }


    const deleteTask = (task) => {

        fbase.firestore().collection('groups').doc(team.id)
            .update({ [task.id]: firebase.firestore.FieldValue.delete() })
            .then(doc => {
                console.log("Delete succeeded.")
                listGroupTasks();
            }).catch(function (error) {
                console.log("Delete failed: " + error.message);
                alert(`The task couldn't be deleted!`);
            });

    }



    return (
        <div className="task">
            <div>
                <h3>{task.text} on {task.day} </h3>
                <AiFillCloseCircle display='inline' color='red' onClick={() => deleteTask(task)}></AiFillCloseCircle>
            </div>
            <button className="btn" onClick={() => setDesc(!desc)}>view description</button>
            <div className="class-description">{desc ? <h4>{task.description}</h4> : <p></p>}</div>
            <select name="task_status" id="task_status" onChange={(e) => selectState(task, e.target.value)}>
                <option value="on hold">On hold</option>
                <option value="started">Started</option>
                <option value="finished">Finished</option>
            </select>
            <p>The task is {status}</p>
        </div>
    )
}
