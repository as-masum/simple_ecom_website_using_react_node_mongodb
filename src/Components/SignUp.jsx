import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const SignUp =()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    // const [] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('token');
        if(auth){
            navigate('/')
        }
    });

    const collectData = async ()=>{

        if( !name || !email || !password ){
            setError(true);
            return false
        }

        console.log("Data:", name, email, password);
        let result = await fetch('http://localhost:3006/api/user/register', {
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-type':'application/json'
            },
        })
        result = await result.json();
        console.log('Result:',result)
        if(result){
            localStorage.setItem('token',JSON.stringify(result))
            navigate('/login')
        }
    }

    return (
        <div className='register'>
            <div>
            <h1>Register Page</h1>
            <input  className='inputBox' type='text' 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'></input>
            {error && !name && <span className='invalid-input'>Please enter name </span>}

            <input className='inputBox' type='gmail'
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'></input>
            {error && !email && <span className='invalid-input'>Please enter email </span>}

            <input className='inputBox' type='password'
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter PassWord'></input>
            {error && !password && <span className='invalid-input'>Please enter password </span>}

            <button onClick={collectData} className='appButton'  type='button'>Sign Up</button>
            <h4>Already Created Account <a href='/login'>Login</a></h4>
        </div>
        </div>
    )
}


export default SignUp;