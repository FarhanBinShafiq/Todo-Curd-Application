import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateTask = () => {
    const storedTask=useLoaderData()
    const [task,setTask]=useState(storedTask)

    const handleUpdateTask = (e) => {
        e.preventDefault();
        console.log(task)
         fetch(`http://localhost:3000/tasks/${storedTask._id}`,{
             method: 'PUT',
             headers: {
                 'content-type': 'application/json'
             },

             body: JSON.stringify(task)
         })

         document.location.reload(false);
         
        
    }

    const handleInputChange=event=>{
        const title=event.target.name
        const value=event.target.value
        const newTask={...task}
        newTask[title]=value
        setTask(newTask)
        console.log(title,value)
     
    }
    return (
        <div className='py-8'>
            <h1 className='text-3xl uppercase text-teal-500'>Update the Task </h1>
            <p className='text-gray-700 py-4 text-3xl'>Task Name:{storedTask.title}</p>

            <div className='py-8'>
                <form className="w-full" onSubmit={handleUpdateTask}>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name='title' onChange={handleInputChange} defaultValue={storedTask.title} className="appearance-none bg-transparent border-none w-full capitalize text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Add New Task..."  />

                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                            + Update The Task
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdateTask;