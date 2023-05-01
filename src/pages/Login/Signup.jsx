import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
const Signup = () => {

    const { register, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [signupError, setSignupError] = useState('')

    //Navigate after log in
    const location = useLocation();
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'


    const handleCreateAccount = async data => {
        console.log(data)
        setSignupError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
               

                //navigation part
                navigate(from, { replace: true })
                //user proile update
                const updateInfo = {
                    displayName: data.name
                }
                updateUser(updateInfo)
                    .then(() => { })
                    .catch(err => {
                        console.log(err)
                    })

            })

            .catch(error => {
                console.log(error.message)
                setSignupError(error.message)

            })

    }

    return (
        <div>


            <div className="py-8 flex items-center pl-3 pr-3 ">
                <div className="w-full">
                    <h1 className="mb-5 text-xl lg:text-5xl font-bold text-info uppercase text-center">Create a new Account</h1>
                    <div className="bg-teal-500 p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
                        {/*React Hook form*/}
                        <form onSubmit={handleSubmit(handleCreateAccount)}>

                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 font-bold  text-gray-600">Full Name</label>
                                <input {...register("name", { required: true, maxLength: 20 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 font-bold  text-gray-600">Email</label>
                                <input {...register("email", { required: true, maxLength: 20 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 font-bold text-gray-600">Password</label>

                                <input {...register("password", { required: true, maxLength: 20 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />

                            </div>
                            <input type='submit' value='Registration' className="block bg-black w-full  text-white font-bold p-4 rounded-lg" />
                            {
                                signupError && <p className='text-red-600'>{signupError}</p>
                            }
                        </form>
                        <br />
                        <p className='text-info'>Already have an account ? <Link to="/login" className='text-teal-600 bg-black uppercase '>Login</Link> </p>

                        <div className="divider text-info text-xl lg:text-3xl font-bold w-full border-opacity-50">OR</div>

                         
                    </div>
                </div>
            </div>





        </div>
    );
};

export default Signup;


