import React, { useState } from 'react';
import { MantineProvider, TextInput, Select, NumberInput, Button, Box, Container, Title, Group, FileInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import Modal from "../../components/Modal";
import dayjs from 'dayjs';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";



const ApplyScreen = () => {
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            border: '2px solid #001F54',
            borderRadius: '8px',
        },
        containerWithoutBorder: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
        },
        title: {
            textAlign: 'center',
            color: '#001F54',
        },
        form: {
            marginTop: '20px',
        },
        submitButton: {
            backgroundColor: '#001F54',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '16px',
        },
        disabledButton: {
            backgroundColor: '#cccccc',
            color: '#666666',
            cursor: 'not-allowed',
        },
    };

    const { state } = useLocation();

    const [yearsOfExp, setYearsOfExp] = useState("");
    const [englishLevel, setEnglishLevel] = useState("");

    const navigate = useNavigate();

    console.log("the state is : ", state?.state, " and user id is : ", state?.user)

    const isFormValid = () => { 
        return (
            state?.user?.name &&
            state?.user?.email &&
            state?.user?.mobilenumber &&
            englishLevel &&
            yearsOfExp 
        );
    }
    const onFinish = async (event) => {
        event.preventDefault();
        console.log('will navigate')
    navigate('/expectedsalary', { state : {state, englishLevel, yearsOfExp} });
    }
    
    return (
        <div>
        
         <MantineProvider
            theme={{
                colorScheme: 'light',
            }}
        >
            <Container style={styles.container}>
                <Title order={2} style={styles.title}>Apply for Job</Title>

                <form onSubmit={onFinish} style={styles.form}>
                    {/* name */}
                    <Box mb="20px">
                        <TextInput
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                            defaultValue={state?.user?.name || ''}
                            readOnly
                        />
                    </Box>
                    {/* email */}
                    <Box mb="20px">
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            required
                            type="email"
                            defaultValue={state?.user?.email || ''}
                            readOnly
                        />
                    </Box>
                    {/* mobile number */}
                    <Box mb="20px">
                        <TextInput
                            label="Mobile Number"
                            placeholder="Enter your mobile number"
                            required
                            type="number"
                            defaultValue={state?.user?.mobilenumber || ''}
                            readOnly
                        />
                    </Box>
                    {/* english level  */}
                    <Box mb="20px">
                        <Select
                            label="English Level"
                            placeholder="Choose your English level"
                            required
                            onChange={(value) => setEnglishLevel(value)}
                            value={englishLevel}
                            data={[
                                { value: 'Intermediate', label: 'Intermediate' },
                                { value: 'Professional', label: 'Professional' },
                                { value: 'Full Professional', label: 'Full Professional' },
                            ]}
                            name="englishLevel"
                        />
                    </Box>
                    {/* years of experience */}
                    <Box mb="20px">
                        <NumberInput
                            label="Years of Experience"
                            placeholder="Enter your years of experience"
                            required
                            min={0}
                            max={10}
                            onChange={(value) => setYearsOfExp(value)}
                            value={yearsOfExp}
                        />
                    </Box>

                    {/* button */}
                    <Box>
                        <Button type="submit" disabled={!isFormValid()}>
                            Apply
                        </Button>
                    </Box>
                </form>
            </Container>
            
        </MantineProvider>
        
        </div>

    );
};

export default ApplyScreen;
