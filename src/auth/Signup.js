import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
 
const Signup=()=>{

    
 
    const paperStyle={padding :20,height:'70vh',width:580, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}
 
   // const[errors,setErrors] = useState('');
    const [user, setUser] = useState({
        name: "",
        email: "",
        password:""
      });

      let history = useHistory();
      
      const {name, email,password} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
 
   async function  signup()
       {
        
        axios.post("http://localhost:8000/api/register",user)
        .then(response  => {
            console.log(response);
            history.push("/");
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        
        // setErrors('Registration Successful')
        // setUser({name:"",email:"",password:""}) // To Clear all fields
      
 
        }  
     
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                
                <TextField label='Name' name="name" value={name} onChange={e => onInputChange(e)} placeholder='Enter Name' type='text' fullWidth required/>
                <TextField label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
                <TextField label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='text' fullWidth required/>
             
                <Button type='submit' onClick={signup} color='primary' variant="contained" style={btnstyle} fullWidth>Singup</Button>
              
                <Typography>Click Here for
                   <NavLink to="/">
                       <span style={{marginLeft:"4px"}}>Login</span>
                  </NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}
 
export default Signup