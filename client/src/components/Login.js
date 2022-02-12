import React,{ Fragment, useState } from 'react';
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material';

const Login= ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""

  });

  const { email, password } = inputs;

    const onChange = (e) => {
      setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async(e) => {
      e.preventDefault();
      try {
        
        const body = {email, password}

        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {"Content-type" : "application/json"},
  
          body: JSON.stringify(body)
        });

        const parseRes = await response.json()
       
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        
      } catch (error) {
        console.error(error.message);
      }
    }

    return(                
      <Fragment> 

   <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      ></Box>


<Container maxWidth="sm"> 
<Box m={2} pt={5}> </Box>
<Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in to you account
              </Typography>
            </Box>
        {/* <h1 className = "text-center my-5">Login</h1> */}
      
         <form onSubmit={onSubmitForm}>

        <input type ="email" name="email" placeholder='email'
        className='form-control my-3'
        value={email}
        onChange={e => onChange(e)}
        />

        <input type ="password" name="password" placeholder='password'
        className='form-control my-3'
        value={password}
        onChange={e => onChange(e)}
       />
    
    

        
        <button className = "btn btn-primary btn-block">Submit</button>
         </form>
        {/* <button onClick={()=> setAuth(true)} >Authenticate</button>  */}

        Don&apos;t have an account?
              {' '}
      
      <Link to ="/register">Register</Link>
     
     
      </Container>
      </Fragment>
    );
};

export default Login;