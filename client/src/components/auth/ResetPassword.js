import React,  { useState, useContext} from "react";
import {TextField, Grid, Button, Typography, Avatar, CssBaseline, InputLabel,
    Paper, Box, InputAdornment, IconButton, OutlinedInput, FormControl } from '@material-ui/core';
import {LockOutlined, VisibilityOff, Visibility} from '@material-ui/icons';
import axios from 'axios';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import {NavbarContext} from '../../context/NavbarContext';
import { LoginStyle as useStyles } from '../layout/Style';
import toast from '../../axios.interceptor';
import  {authRoute, dashboardRoute} from '../../constants/RouteConstants';
import Copyright from '../layout/CopyRight';
import  {authMessages} from '../../constants/MessagesConstant';

const ResetPassword = (props) => {
    const [userPassword, setUserPassword] = useState({
        password: '',
        confirmPassword: '',
        showPassword: false
    });

    const {navbar} = useContext(NavbarContext);
    const {email, token} = queryString.parse(props.location.search);

    if(navbar.isUserLoggedIn){
        props.history.push(dashboardRoute);
    }

    const classes = useStyles();
    
    const handleChange = (event) => {
        setUserPassword({...userPassword, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(authRoute.resetPassword, {
            Email: email,
            Token: token,
            NewPassword: userPassword.password,
            ConfirmPassword: userPassword.confirmPassword
        })
        .then((res) => {
            toast.success(res.data?.message);
        })
    };

    const handleClickShowPassword = () => {
        setUserPassword({...userPassword, showPassword: !userPassword.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  
    
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
                        Reset Password
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form} >
                         
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="password" required>Password</InputLabel>
                            <OutlinedInput variant="outlined" onChange={handleChange} required fullWidth name="password" label="Password"
                                id="password" autoComplete="current-password" type={userPassword.showPassword ? 'text' : 'password'} value={userPassword.password}
                                placeholder="Enter Your Password" endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} edge="end" >
                                            {userPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                } labelWidth={80} />
                            </FormControl>
                            <TextField variant="outlined" margin="normal" onChange={handleChange} required fullWidth id="confirmPassword" name="confirmPassword" label="Confirm Password"
                                type="password" autoComplete="current-password" placeholder="Please confirm password" />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            Send Recovery Link
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/signin" variant="body2">
                                    Sign in
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
 
export default ResetPassword;