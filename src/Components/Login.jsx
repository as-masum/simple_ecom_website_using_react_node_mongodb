import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error,setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('token');
        if(auth){
            navigate('/')
        }
    })

    const handleLogin = async ()=>{

        // if( !email || !password){
        //     setError(true)
        //     return false
        // }
        let result = await fetch('http://localhost:3006/api/user/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.warn('data:',result)
        result = await result.json();
        // alert(JSON.stringify(result.token))
    console.warn('result ', result)
    if(result.token){
        console.warn('token ', result.token)
        console.warn('userId ', result.userId)

        localStorage.setItem('token',JSON.stringify(result.token))
        localStorage.setItem('user_id',JSON.stringify(result.userId))
        navigate('/')
    }
    else{
        alert(result)
    }
    }

    return (
        <div className='login'>
            <h1>Login Page</h1>
            <input required className='inputBox' type='email' placeholder='User Email'
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            {/* {error && !email && <span className='invalid-input'>Please enter email</span>} */}

            <input className='inputBox' type='password' placeholder='User Password'
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            {/* {error && !password && <span className='invalid-input'>Please enter password</span>} */}

            <button onClick={handleLogin} className='appButton' type='button'>Login</button>
            <h4>Create Account <a href='/signup'>Register</a></h4>


        </div>
    )
}

export default Login