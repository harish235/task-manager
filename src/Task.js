import React, { useState } from 'react';
import fbase from './firebase';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Task({ task, listTasks }) {
    const [status, setStatus] = useState(task.status);
    const [desc, setDesc] = useState(false);
    const user = fbase.auth().currentUser;

    const selectState = (task, value) => {
        let task_status = { status: value };
        fbase.database().ref().child('/' + user.uid + '/' + task.id).update(task_status).then(function () {
            console.log("Update succeeded.")
            setStatus(value)
        }).catch(function (error) {
            console.log("Update failed: " + error.message);
            alert(`The task couldn't be updated!`);
        });

    }

    const deleteTask = (task) => {
        fbase.database().ref().child('/' + user.uid + '/' + task.id).remove().then(function () {
            console.log("Delete succeeded.")
            listTasks();
        }).catch(function (error) {
            console.log("Delete failed: " + error.message);
            alert(`The task couldn't be deleted!`);
        });
    }



    return (
        <div className="task task.reminder" >
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
