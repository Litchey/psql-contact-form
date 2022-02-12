import React,{ Fragment, useState } from 'react';
import {Link} from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  TextField,
  Grid,
  Typography
} from '@mui/material';






const Register = ({setAuth}) => {

  const[inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    storetype: "",
    productlist: ""
  });

  const {email, password, name, storetype, productlist } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]
    : e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {

      const body = {email, password, name, storetype, productlist}
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {"Content-type" : "application/json"},

        body: JSON.stringify(body)
      });

        const parseRes = await response.json();
        
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
    } catch (error) {
     console.error(error.message) ;
    }
  };



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
      
         {/* <h1 className = "text-center my-5">Register</h1> */}

        <Container maxWidth="sm"> 
        <Box m={2} pt={5}> </Box>

        <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <form onSubmit={onSubmitForm}>

        <input type="email" name="email" placeholder='Email'
        className='form-control my-3' value={email} onChange = {e => onChange(e)}
        /> 


        <input type="password" name="password" placeholder='Password'
        className='form-control my-3' value={password} onChange = {e => onChange(e)}
        /> 


        <input type="text" name="name" placeholder='Store-name' 
        className='form-control my-3' value={name} onChange = {e => onChange(e)}
        />  
 <      input type="text" name="storetype" placeholder='Business-type' 
        className='form-control my-3' value={storetype} onChange = {e => onChange(e)}
        /> 
        
         <input type="text" name="productlist" placeholder='List of products' 
        className='form-control my-3' value={productlist} onChange = {e => onChange(e)}
        /> 
<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
> </Grid>
        <button className = "btn btn-primary btn-block">Sign-up</button>
        
        </form> 
        Have an account?
              {' '}
        <Link to ="/login">Login</Link>
        
        </Container>
        </Fragment>
    );
};

export default Register;