import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {  NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login =()=>{

    const paperStyle = {padding : 20, height : '70vh', width : 580, margin : "20px auto"}
    const avatarStyle = {backgroundColor : '#3370bd' }
    const btnStyle = {margin : '8px 0'}

    const [msg,setMsg] = useState('');

   // const [username,setUsername] = useState('');

    //const [pass,setPass] = useState('');

    const [user, setUser] = useState({
        email : "",
        password : "",
    });

    let history = useHistory();

    const {email,password} = user;

    const onInputChange = e => {
        setUser({...user,[e.target.name] : e.target.value });
    };

    const signIn = () =>
    {
 

   // const users = { username };

    if(user.email === '')
    {
        alert('Email Field is empty')
    }
    else if(user.password === '')
    {
        alert('Pass Field is empty')
    }

    axios.post("http://localhost:8000/api/login_check", user)
    .then(Response => {
        setMsg(Response.data);
        localStorage.setItem("users",Response.data);
        history.push("BlogPost");
    });

}


    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <h2>Login</h2>
                    <h4 style={{color:"green"}}>{msg}</h4>
                </Grid>
                <TextField 
                    label="Email" 
                    name="email" 
                    value={email} 
                    onChange={e => onInputChange(e) }
                    placeholder="Enter Your Email" 
                    type="text"
                    fullWidth 
                    required
                />
    
                <TextField 
                    label="Password" 
                    name="password" 
                    value={password} 
                    onChange={e => onInputChange(e) }
                    placeholder="Enter Your Password" 
                    type="text"
                    fullWidth 
                    required
                />
    
                <Button 
                    type="submit"
                    onClick={signIn}
                    color="primary"
                    variant="contained" 
                    style={btnStyle} f
                    ullWidth
                >
                    Login
    
                </Button>
    
                <Typography>
                    Don't Have Account ?
                    <NavLink to="Signup">
                        <span style={{marginLeft:"4px"}}>Signup</span>
                    </NavLink>
                </Typography>
    
            </Paper>
        </Grid>
    )

}



export default Login