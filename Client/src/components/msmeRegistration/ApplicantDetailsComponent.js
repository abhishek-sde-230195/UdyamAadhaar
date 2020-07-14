import React,  { useState} from "react";
import {TextField, FormControl, Grid, Select, MenuItem, Button, InputLabel} from '@material-ui/core';
import clsx from 'clsx';
import {useStyles} from '../layout/Style';
import {CategoryList} from '../../helperMethods/CommonHelperData';

const ApplicantDetailsComponent = (props) => {
    const [applicantDetails, setApplicantDetails] = useState({
        firstName: 'asd',
        lastName: 'sds',
        aadhaarNumber: 'sd',
        mobileNumber: '2323',
        email: 'sds@sfd',
        category: ''
    })
    
    const {activeStep, handleBack, handleNext, maxLength} = props
    const classes = useStyles();

    const handleChange = () => (event) => {
        console.log(event);
        setApplicantDetails({...applicantDetails, [event.target.id]: event.target.value });
        console.log(applicantDetails)
    };

    const handleChangeDropDown = (event) => {
        setApplicantDetails({
            ...applicantDetails,
            category: event.target.value
        });
      };
    
    
    
    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(applicantDetails);
        handleNext();

    }

    const categoryDropDownHtml = CategoryList.map(category => {
        return (
            <MenuItem value={category.id} key={category.id}>{category.text}</MenuItem>
        );
    })

    return (
            <form onSubmit={handleSubmit}>
                <Grid  container className="text-align-center grid-class" justify="center"  alignItems="center" spacing={3}>
                    
                    <Grid  item xs={12} sm={12} md={12}>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="firstName" label="First Name" variant="outlined" value={applicantDetails.firstName}
                                    onChange={handleChange()} placeholder="Please enter first name as printed on your Aadhaar Card" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="lastName" label="Last Name" variant="outlined" value={applicantDetails.lastName}
                                    onChange={handleChange()} placeholder="Please enter last name as printed on your Aadhaar Card" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="aadhaarNumber" label="Aadhaar Number" variant="outlined" value={applicantDetails.aadhaarNumber}
                                    onChange={handleChange()} title = "Please enter the Aadhaar card number as printed on your Aadhaar Card" placeholder="Please enter the Aadhaar card number as printed on your Aadhaar Card" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="number" id="mobileNumber" label="Mobile No" variant="outlined" value={applicantDetails.mobileNumber}
                                    onChange={handleChange()} placeholder="Please enter the Contact number linked to your Aadhaar card" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="email" id="email" label="Email" variant="outlined" value={applicantDetails.email}
                                    onChange={handleChange()} placeholder="Please enter your active Email address" />
                                </FormControl>
                            </Grid>
                            <Grid   item xs={12} sm={6} md={6} >
                                <FormControl fullWidth  className={clsx([classes.whiteBackground])} variant="outlined">
                                    <InputLabel id="labelCategory" >Social Category</InputLabel>
                                    <Select labelId="labelCategory" value={applicantDetails.category} id="category" 
                                     onChange={handleChangeDropDown} label="Social Category">
                                    <MenuItem value="" >
                                        <em>None</em>
                                    </MenuItem>
                                    {categoryDropDownHtml}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid> 
                    </Grid>            
                </Grid>
                <div className={classes.actionsContainer}>
                    <div>
                        <Button  disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            {activeStep === maxLength - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </form>
    );
}
 
export default ApplicantDetailsComponent;