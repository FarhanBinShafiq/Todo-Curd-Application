import React, { useContext } from 'react';
import Tasks from '../Tasks/Tasks';
import Login from '../Login/Login';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const TaskForm = () => {
    const { user,loading } = useContext(AuthContext)

    const handleTask = (e) => {
        e.preventDefault();
        console.log('Added')
        const title=e.target.title.value
        const  newTitle={title}
        console.log(title)

        fetch('http://localhost:3000/task',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify(newTitle)
        })
        document.location.reload(false);
    }

    if(loading){
        return <Loading></Loading>
    }
    return (
        <>
          {
            user?.email ? 
            <div>

            <div className='py-8'>
                <form className="w-full" onSubmit={handleTask}>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name='title' className="appearance-none bg-transparent border-none w-full capitalize text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Add New Task..."  />

                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                          +  Add New Task
                        </button>
                    </div>
                </form>
            </div>

            <div>
                <Tasks/>
            </div>


        </div >  : <Login/>
  
         
          }
        </>
    );
};

export default TaskForm;