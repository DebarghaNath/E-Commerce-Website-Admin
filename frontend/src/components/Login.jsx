import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { sha512} from 'js-sha512';

import './Login.css'




const Login = () => {
    const navigate = useNavigate();
    const [data,setData] = useState(
        {
            user_name : "",
            password : "" 

        });
    const handleChange = (e)=>
        {
            setData((prev)=>({...prev,[e.target.name]:e.target.value}));
        };
    //console.log(data);
    const handleClick = async (e)=>
        {
           
            e.preventDefault()
            try
            {
                alert([data.user_name, data.password]);
                data.password = sha512(data.password).toString();
                const res = await axios.post("http://localhost:3000/login", data,{
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                console.log(res.data)
                if(res.data==2)
                    navigate("/dashboard");
                else if(res.data==1)
                {
                    alert("NOT VERIFIED USER");
                }
                else
                {
                    alert("SERVER ERROR");
                }
            }
            catch(err)
            {

            }
        }
      
  return (
    <div className='page-inner-login'>
        <div className='card-login'>
            <div className='card-header-login'>
                <h1>LOGIN</h1>
            </div>
            <h6>Please enter the UserName & Password</h6>
            <div className='new'>
                <form onSubmit={handleClick} >
                <div className='form-group-login'>
                    <input type = "text" placeholder='user_name' name="user_name" onChange={handleChange}/>
                </div>
                <div className='form-group-login'>
                    <input type = "password" placeholder='password' maxLength="10" name ="password" onChange={handleChange}/>
                </div>
                <div className='form-group-login'>
                    <button type="submit">LOGIN</button>
                    </div>
                <div className='reg'>
                    <div className='form-group-login'>
                    <span>
                       <h4> dont have an account?</h4>
                    </span>
                    <Link to="/Register">Register</Link>
                </div>
                    </div>
                </form>
                </div>
        </div>
    </div>
  )
}

export default Login
