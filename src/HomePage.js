import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import fbase from './firebase';
import Task from './Task';
import Navbar from './Navbar';


const HomePage = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    let fetchedTasks = [];


    const listTasks = () => fbase.database().ref().child(user.uid).get().then((snapshot) => {
        fetchedTasks = [];
        setTasks([]);
        if (snapshot.exists()) {
            snapshot.forEach(item => {
                fetchedTasks.push(item.val());
            });
            setTasks([...fetchedTasks]);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });




    useEffect(() => {
        listTasks();
    }, []);



    return (
        
        <section className='homepage'>
        <div stlye={{}}>
    </div>
 
            <AddTask listTasks={listTasks} dbtype={'realtime-database'} />
            <div>
                {tasks.map((task, index) => {
                    //change key 
                    return (<Task key={index} task={task} listTasks={listTasks}></Task>)
                })}
            </div>
        </section>
    );

}

export default HomePage;