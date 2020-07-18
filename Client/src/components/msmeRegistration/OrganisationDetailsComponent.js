import React,  { useState} from "react";
import {TextField, FormControl, Grid, Select, MenuItem, Button, InputLabel} from '@material-ui/core';
import clsx from 'clsx';
import {useStyles} from '../layout/Style';
import {organisationTypeList} from '../../helperMethods/CommonHelperData';

const OrganisationDetailsComponent = (props) => {
    const [organisationDetails, setOrganisationDetails] = useState({
        organisationName: 'xyz',
        registeredAddress: 'sdfd',
        panNumber: 'ssada',
        dateOfEstablishment: '',
        organisationType: 1,
        personEmployed: 2324,
        totalInvestment: '23232',
        desciption: 'sds'
    })
    
    const {activeStep, handleBack, handleNext, maxLength} = props
    const classes = useStyles();

    const handleChange = () => (event) => {
        console.log(event.target);
        setOrganisationDetails({...organisationDetails, [event.target.id]: event.target.value });
        console.log(organisationDetails)
    };

    const handleChangeDropDown = (event) => {
        setOrganisationDetails({
            ...organisationDetails,
            organisationType: event.target.value
        });
    };
    
    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(organisationDetails);
        handleNext(organisationDetails, 2);

    }

    function setDefaultDate(){
        const dateNow = new Date(); // Creating a new date object with the current date and time
        const year = dateNow.getFullYear(); // Getting current year from the created Date object
        const monthWithOffset = dateNow.getMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
        const month = // Setting current Month number from current Date object
            monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
                ? `0${monthWithOffset}`
                : monthWithOffset;
        const date =
            dateNow.getDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
                ? `0${dateNow.getDate()}`
                : dateNow.getDate();

        const materialDateInput = `${year}-${month}-${date}`
        return materialDateInput;
    }

    const organisationTypeDropDownHtml = organisationTypeList.map(category => {
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
                                    <TextField required type="text" value={organisationDetails.organisationName} id="organisationName" label="Organisation Name" variant="outlined"
                                    onChange={handleChange()} placeholder="Please enter the name of your Firm/ Organization/ Company" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" value={organisationDetails.registeredAddress} id="registeredAddress" label="Registered Address" variant="outlined"
                                    onChange={handleChange()} placeholder="Please enter the registered address of your Firm/ Organization/ Company" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" value={organisationDetails.panNumber} id="panNumber" label="Firm PAN Number" variant="outlined"
                                    onChange={handleChange()} title = "Please enter the PAN Number of your Firm/ Organization/ Company – Enter PAN of individual in case of Proprietorship firm" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                <TextField
                                        id="dateOfEstablishment"
                                        label="Date of Establishment"
                                        variant="outlined"
                                        type="date"
                                        placeholder="Please enter the date of establishment of your Firm/ Organization/ Company"
                                        onChange={handleChange()}
                                        value={organisationDetails.dateOfEstablishment||setDefaultDate()}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid   item xs={12} sm={6} md={6} >
                                <FormControl fullWidth  className={clsx([classes.whiteBackground])} variant="outlined">
                                    <InputLabel id="labelOrganisationType">Type Of Organisation</InputLabel>
                                    <Select labelId="labelOrganisationType" value={organisationDetails.organisationType} label="Type of Organisation" id="organisationType" 
                                     onChange={handleChangeDropDown}>
                                    <MenuItem value="" >
                                        <em>None</em>
                                    </MenuItem>
                                    {organisationTypeDropDownHtml}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required value={organisationDetails.personEmployed} type="text" id="personEmployed" label="Person Employed" variant="outlined"
                                    onChange={handleChange()} placeholder="Please enter the total number of employees (approximate)" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="totalInvestment" label="Total Investment" variant="outlined"
                                    onChange={handleChange()} value={organisationDetails.totalInvestment} placeholder="Please enter the total amount invested in rupees" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth  className={clsx(classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="desciption" label="Description of Business Activity" variant="outlined"
                                    onChange={handleChange()} multiline rowsMax={6} rows={4}
                                    value={organisationDetails.desciption} placeholder="Please describe your business activity of the Firm/ Organization/ Company" />
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
 
export default OrganisationDetailsComponent;