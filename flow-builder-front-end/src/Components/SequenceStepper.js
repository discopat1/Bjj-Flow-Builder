import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import dataSet from '../BaseLayout/Data'

export default function SequenceStepper(props) {
  const {
      setRenderStepper,
      combos,
      setTimer,
      activeStep,
      setActiveStep,
      handleNext,
      timerSound,
      declareSequence
  } = props

  React.useEffect(()=>{
    declareSequence()
  },[activeStep])
  
  const steps = combos;
  // console.log('steps: ', steps)

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //  reset timer
    setTimer(false)
    setTimeout(() => setTimer(true),1000)
  };


  const handleReset = () => {
    setActiveStep(0);
    setRenderStepper(false)
    setTimer(false)
    timerSound.pause()
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
