import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';


 

const Login = () => {

    const { register, handleSubmit } = useForm();
    const { signIn} = useContext(AuthContext)
    const [signinError, setSigninError] = useState('')



    //Navigate after log in
    const location = useLocation();
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'


     

    const onSubmit = data => {
        console.log(data)
        setSigninError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user)
                //navigation part
                navigate(from, { replace: true })
            })

            .catch(error => {
                console.log(error.message)
                setSigninError(error.message)

            })

    }

    return (
        <div>

            <div className='py-4'>
                <h4 className='text-2xl uppercase text-red-600'>Note: For Use this curd Application you need to log in first !!!!</h4>
                <p className='text-xl  text-orange-500'>Default User: Email - admin123@gmail.com, Password : 123456789</p>
            </div>
            <div className="   flex items-center pl-3 pr-3 ">
                <div className="w-full">
                    <h1 className="mb-5 text-xl lg:text-5xl font-bold text-info uppercase text-center">Log into your Account</h1>
                    <div className="bg-teal-500 p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
                        {/*React Hook form*/}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 font-bold  text-gray-600">Email</label>
                                <input {...register("email", { required: true, maxLength: 20 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 font-bold text-gray-600">Password</label>

                                <input {...register("password", { required: true, maxLength: 20 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                            </div>
                            <input type='submit' value='Log in' className="block bg-black w-full  text-white font-bold p-4 rounded-lg" />
                            {
                                signinError && <p className='text-red-500'>{signinError}</p>
                            }
                        </form>
                        <br />
                        <p className='text-info'>If are a new user ? <Link to="/registration" className='text-teal-600 bg-black uppercase '>Create Account</Link> </p>
                         
                    </div>
                </div>
            </div>





        </div>
    );
};

export default Login;