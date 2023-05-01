import React, { useContext, useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
 

const Tasks = () => {

    const [tasks, setTask] = useState([])
    const { user,loading } = useContext(AuthContext)



    useEffect(() => {
        fetch(`http://localhost:3000/tasks`)
            .then(res => res.json())
            .then(data => {
                setTask(data)
                console.log(data)
            })
    }, [])
    


   
 if(loading){
        return <Loading></Loading>
    }

    const handleDeleteTask = (task) => {
        const deleteTask = window.confirm(`Are you want to delete  ${task.title}`)
        console.log(deleteTask)

        if (deleteTask) {
            console.log('Deleteing the task:', task._id)
            fetch(`http://localhost:3000/tasks/${task._id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    document.location.reload(false);
                }
            })

    
        }

    }



    return (
        <div>
            <h4 className='text-3xl apitalize hover:uppercase text-teal-500'>All Task</h4>


            {
                tasks.map(task =>
                    <div className='py-8' key={task._id}>
                        <div className="card w-full bg-black shadow-xl">
                            <div className='flex text-teal-500 uppercase items-center justify-center gap-36'>
                                <div className=''>
                                    <p className='text-2xl'>{task.title}</p>
                                </div>
                                <div className='flex gap-36'>
                                       
                                    <Link to={`/update/${task._id}`}>
                                        <AiFillEdit className='text-2xl ' />
                                    </Link>

                                    <AiFillDelete className='text-xl'
                                        onClick={() => handleDeleteTask(task)}
                                    />


                                </div>
                            </div>
                        </div>


                    </div>

                )
            }



        </div>
    );
};

export default Tasks;