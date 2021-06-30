import React, { Children, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Step, StepLabel, Stepper } from '@material-ui/core';

export default function FormikStepper({children, ...props}){
    const childrenArray = Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];

    function isLastStep() {
        return step === childrenArray - 1
    }

    return(
        <Formik {...props} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers);
            }else{
                setStep(s=> s+1);
            }
        }}>
            <Form>
                <Stepper activeStep={step}>
                    {childrenArray.map((label) => (
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {currentChild}
                {step > 0 && <Button onClick={() => setStep(s=> s-1)}>Voltar</Button>}
                <Button color="primary" variant="contained" type="submit">{isLastStep() ? 'Finalizar' : 'Próximo'}</Button>
            </Form>
        </Formik>
    );
}