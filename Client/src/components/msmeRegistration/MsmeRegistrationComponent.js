import React, {useState} from 'react';
import {useStyles} from '../layout/Style';
import {Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, Card, Grid } from '@material-ui/core';
import ApplicantDetailsComponent from './ApplicantDetailsComponent';
import OrganisationDetailsComponent from './OrganisationDetailsComponent';
import BankDetailsComponent from './BankDetailsComponent';
import axios from 'axios';
import toast from '../../axios.interceptor';

const MsmeRegistrationComponent = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [udhyamAadharDetails, setUdhyamAadharDetails] = useState({});
    const getSteps = () => {
        return ['Applicant Details', 'Organisation Details', 'Bank Details'];
    }
    const aadharConstant = {
        applicant : 1,
        organisation : 2,
        bank: 3
    };
    const steps = getSteps();
    const getStepContent = (step) => {
        switch (step) {
            case 0:
            return (
                <ApplicantDetailsComponent activeStep={activeStep} handleBack={handleBack}  
                    handleNext={handleNext} maxLength={steps.length} />
            );
            case 1:
            return (
                <OrganisationDetailsComponent activeStep={activeStep} handleBack={handleBack} 
                    handleNext={handleNext} maxLength={steps.length} />);
            case 2:
            return ( 
                <BankDetailsComponent activeStep={activeStep} handleBack={handleBack} 
                    handleNext={handleNext} maxLength={steps.length} /> );
            default:
            return 'Unknown step';
        }
    }

    const saveFormData = (data) => {
        console.log(JSON.stringify(data));
        axios.post('auth/Register/', {
            data
        })
        .then(() => {
            toast.success("Your data is successfully saved");
        })
    };
  
    const handleNext = (data, pageNumber) => {
        switch(pageNumber){
            case aadharConstant.applicant: 
                setUdhyamAadharDetails({
                    ...udhyamAadharDetails,
                    applicantDetails: data
                });
                setActiveStep(activeStep+ 1);
                break;
            case aadharConstant.organisation:
                setUdhyamAadharDetails({
                    ...udhyamAadharDetails,
                    organisationDetails: data
                });
                setActiveStep(activeStep+ 1);
                break;
             case aadharConstant.bank: 
                setUdhyamAadharDetails({
                    ...udhyamAadharDetails,
                    bankDetails: data
                });
                setActiveStep(activeStep+ 1);
                data = {...udhyamAadharDetails, bankDetails: data};
                saveFormData(data);
                break;   
            default:
                break;
        }
    };

    const handleSubmit = (data) => {
        setActiveStep(activeStep+ 1);
        console.log("form  details",udhyamAadharDetails);
    };
  
    const handleBack = () => {
        console.log(activeStep)
      setActiveStep(activeStep- 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
        <div className='text-align-center'>

            <h2 className="msme-header">Fill in the form below to get your Udyog Aadhaar/ MSME Registration/ Udyam Registration certificate</h2>
            <Card className='container card-container'>
            <div className={" text-allign-unset " + classes.root}  >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                              
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
            </Card>
            <div className="container disclaimer">
                <p>Legal Disclaimer: This website is managed under the guidance of professional & private consultants. Our aim is to advise & assist in registration of the organisations in MSME & get their Udyog Aadhaar Certificate with no difficulties. Our main motive for launch of this platform is to enhance knowledge & guide firms to take benefits of the schemes launched by the Govt. of India. We charge a small amount to give timely & better services for registration, updation on regular basis and apprise or assist in schemes and benefits of the MSME, Loans facilities, etc. Kindly note for MSME/Udyog Aadhaar registration there are no government fees. The amount paid by you are against Advisory charges for assistance in business registration in MSME / Udyog Aadhaar & apprise you more about other permissions or licenses required to run business in accordance to state or central laws.</p>
            </div>
           </div>
    );
}
 
export default MsmeRegistrationComponent;