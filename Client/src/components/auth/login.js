import React,  { useState, useContext} from "react";
import {TextField, Grid, Button, Typography, Avatar, CssBaseline, FormControlLabel, InputLabel,
     Checkbox, Paper, Box, InputAdornment, IconButton, OutlinedInput, FormControl } from '@material-ui/core';
import {LockOutlined, VisibilityOff, Visibility} from '@material-ui/icons';
import axios from 'axios';
import {Link} from 'react-router-dom';
import  {AxiosConstant} from '../../constants/AxiosConstants';
import {setCookie} from '../../helperMethods/CookieHelper';
import { makeStyles } from '@material-ui/core/styles';
import {NavbarContext} from '../../context/NavbarContext';
import toast from '../../axios.interceptor';
import Copyright from '../layout/CopyRight';
 
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    margin:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    image: {
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = (props) => {
    const classes = useStyles();
    const [login, setLogin] = useState({
        email: '',
        password: '',
        showPassword: false
    })

    const {navbar, setUserLogIn} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push('/');
    }
    const handleChange = (event) => {
        setLogin({...login, [event.target.id]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setLogin({...login, showPassword: !login.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(login)
        axios.post('auth/Login/', {Email: login.email,Password: login.password})
            .then(res => {
                setCookie(AxiosConstant.token,res.data.data.token, res.data.data.expireDate) 
                setUserLogIn(true, res.data.data.fullName);
                toast.success(`Welcome ${res.data.data.fullName}. We are looking forward to host you!!`)
                props.history.push('/');
            })
    }
 
    return ( 
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={'img-login ' + classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} >
                         
                        <TextField variant="outlined" type="email" margin="normal" required fullWidth id="email" label="Email Address"
                            onChange={handleChange} placeholder="Enter Your User Name" />
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="password" required>Password</InputLabel>
                            <OutlinedInput variant="outlined" onChange={handleChange} required fullWidth name="password" label="Password"
                                id="password" autoComplete="current-password" type={login.showPassword ? 'text' : 'password'} value={login.password}
                                placeholder="Enter Your Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} edge="end" >
                                            {login.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                } labelWidth={80} />
                        </FormControl>
                        <FormControlLabel control={
                            <Checkbox value="remember" color="primary" />
                        } label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
     );
}
 
export default Login;