import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
 
 
const Header = () => {
    

    const {logOut,user}=useContext(AuthContext)

    const signout=()=>{
        logOut()
    }
    return (
        
        <div>
            <ul className='flex gap-6 justify-center text-2xl uppercase' >
                <li><a href='/'>Home</a></li>
                 <li><a href='/registration'>Registration</a></li>

                {
                    user?.uid ?<li><a href='/login'onClick={signout}>Sign Out</a></li> :<li><a href='/login'>Log In</a></li>


                }


            </ul>
        </div>
    );
};

export default Header;