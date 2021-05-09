import React, { useState } from 'react'
import fbase from './firebase';
const { v4: uuidv4 } = require('uuid');

export default function AddTask({ listTasks, dbtype, team, listGroupTasks }) {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const [description, setDescription] = useState('');



    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task');
            return;
        }

        var uid = fbase.auth().currentUser.uid;
        if (dbtype === 'firestore') {
            const taskRef = fbase.firestore().collection('/groups').doc(team.id);
            const idRef = taskRef;
            const id = uuidv4().slice(0, 10)
            taskRef.update(
                {
                    [id]: {
                        id: id,
                        text: text,
                        day: day,
                        description: description,
                        reminder: reminder,
                        status: 'On hold',
                        type: 'task'
                    }
                }
            )
            listGroupTasks();
        } else {
            var taskRef = fbase.database().ref().child(uid).push({
                text: text,
                day: day,
                description: description,
                reminder: reminder,
                status: 'On hold'
            });

            taskRef.set({
                id: taskRef.key,
                text: text,
                day: day,
                description: description,
                reminder: reminder,
                status: 'On hold'
            });
            listTasks();
        }





        setText('')
        setDay('')
        setReminder(false)
        setDescription('')


    }

    return (
        <div style={!team ? { position: "absolute", right: '100px' } : {}}>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Task</label>
                    <input
                        type='text'
                        placeholder='Add Task'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Day & Time</label>
                    <input
                        type='text'
                        placeholder='Add Day & Time'
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Description</label>
                    <textarea
                        placeholder='Add task description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input
                        type='checkbox'
                        checked={reminder}
                        value={reminder}
                        onChange={(e) => setReminder(e.currentTarget.checked)}
                    />
                </div>

                <input type='submit' value='Save Task' className='btn btn-block' />
            </form>
        </div>
    );
}
