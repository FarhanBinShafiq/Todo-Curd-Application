
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import Header from './pages/Header/Header';

function App() {
  return (
    <div className="max-w-full  mx-auto ">
      
  <Header></Header>
      <h1 className='text-3xl uppercase text-teal-500 border-b-4 border-sky-500 py-5'>Curd Application</h1>
      <RouterProvider router={router}></RouterProvider>
     
    </div>
  );
}

export default App;