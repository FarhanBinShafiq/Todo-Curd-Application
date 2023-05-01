import { createBrowserRouter } from "react-router-dom";
import UpdateTask from "../pages/UpdateTask/UpdateTask";
import TaskForm from "../pages/TaskForm/TaskForm";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp"
 
 


const router = createBrowserRouter([
            {
                path: '/',
                element: < TaskForm />
            },
            {
                path:'/update/:id',
                element:<UpdateTask/>,
                loader:({params})=>fetch(`http://localhost:3000/tasks/${params.id}`)
            },
            {
                path: '/registration',
                element: < SignUp />
            },
            {
                path: '/login',
                element: < Login/>
            },

    

])


export default router;