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
    const [expectedSalary, setExpectedSalary] = useState("");
    const [currencyExpectedSalary, setCurrencyExpectedSalary] = useState("");
    const [startAvailability, setStartAvailability] = useState("");
    const [prefJobLocation, setPrefJobLocation] = useState("");
    const [cvFile, setCvFile] = useState('');
    const [modal, setModal] = useState({ show: false });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    console.log("the state is : ", state?.state, " and user id is : ", state?.user)

    const isFormValid = () => { 
        return (
            state?.user?.name &&
            state?.user?.email &&
            state?.user?.mobilenumber &&
            englishLevel &&
            yearsOfExp &&
            expectedSalary&&
            currencyExpectedSalary  &&
            startAvailability &&
            prefJobLocation &&
            ((state?.user?.cv ) || (cvFile))
        );
    }
    const handleClose = () => {
        setModal({ show: false });
        navigate("/myapps");
      };
    
    const onFinish = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const formattedAvailabilityStart = dayjs(startAvailability).format('DD/MM/YYYY')
        const concatinatedExpectedSalary = expectedSalary+ " " + currencyExpectedSalary ;
        
        const {userid}  = state?.user
        const { requiredskills, jobid, jobtitle, companyname, country, city } = state?.state;        

        try {
            if(!state?.user?.cv){
                console.log("---------------------",cvFile.name)
                const cvURl = await uploadCv({ cv: cvFile });
                const localStrData = JSON.parse(localStorage.getItem("user"));

                const response = await fetch(
                    "https://work-it-back.vercel.app/api/user/editProfile",
                    // "http://localhost:5002/api/user/editProfile",
                    {
                      method: "put",
                      headers: {
                        "Content-Type": "application/json",
                        authorization: "token: " + localStrData.token,
                        type: "user",
                      },                
                      body: JSON.stringify({
                        userData : {
                            cvURl : cvURl,
                            cvName : cvFile.name,
                            userid : state?.user?.userid,
                            onlyCv : true
                        }
                      }),
                    }
                  );
            }
            const res = await fetch("https://work-it-back.vercel.app/api/job/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userid,
                  jobid,
                  requiredskills,
                  jobtitle,
                  companyname,
                  country,
                  city,
                  yearsOfExp,
                  englishLevel,
                  concatinatedExpectedSalary,
                  formattedAvailabilityStart,
                  prefJobLocation,
                }),
              });
            const json = await res.json();

            setIsLoading(false)
            setModal({
                show: true,
                title: "Success",
                body: json.msg,
              });

        } catch (error) {
            setModal({
                show: true,
                title: "Failure",
                body: error.message.includes("duplicate")
                  ? "Can't Apply for the same job twice!"
                  : "Something went wrong.",
              });
        }
    }
    const uploadCv = async ({ cv }) => {
        try {
          let cvURL;
          if (cv && cv.type === "application/pdf") {
            const file = new FormData();
            file.append("file", cv);
            file.append("cloud_name", "dapnyieo6");
            file.append("upload_preset", "swjjtdpv");
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dapnyieo6/auto/upload",
              {
                method: "post",
                mode: "cors",
                body: file,
              }
            );
            const cvData = await response.json();
            cvURL = cvData.url.toString();
            return cvURL;
          } else {
            alert("type should be PDF ");
          }
        } catch (error) {
          console.error("Error while uploading image: ", error);
        }
      };
    

    return (
        <div>
        {isLoading && 
        <MantineProvider theme={{colorScheme: 'light',}}>
            <Container style={styles.containerWithoutBorder}>
                <Title order={2} style={styles.title}>Applying for Job ...</Title>
                <Loader />
            </Container>
        </MantineProvider>
        }
        {!isLoading && <MantineProvider
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
                                { value: 'beginner', label: 'Beginner' },
                                { value: 'intermediate', label: 'Intermediate' },
                                { value: 'advanced', label: 'Advanced' },
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
                            max={60}
                            onChange={(value) => setYearsOfExp(value)}
                            value={yearsOfExp}
                        />
                    </Box>
                    {/* expected salary */}
                    <Box mb="20px">
                        <Group>
                            <NumberInput
                                label="Expected Salary"
                                placeholder="Enter your expected salary"
                                required
                                style={{ flex: 1 }}
                                onChange={(value) => setExpectedSalary(value)}
                                value={expectedSalary}
                            />
                            <Select
                                label="Currency"
                                placeholder="Select currency"
                                required
                                style={{ flex: 1 }}
                                data={[
                                    { value: 'usd', label: 'USD' },
                                    { value: 'eur', label: 'EUR' },
                                    { value: 'eg', label: 'EGY' },
                                    { value: 'gbp', label: 'GBP' },
                                    { value: 'inr', label: 'INR' },
                                ]}
                                onChange={(value) => setCurrencyExpectedSalary(value)}
                                value={currencyExpectedSalary}
                            />
                        </Group>
                    </Box>
                    {/* availability to start */}
                    <Box mb="20px">
                        <DateInput
                            label="Availability to Start"
                            placeholder="Select your availability to start"
                            required
                            minDate={dayjs().toDate()}
                            format="DD/MM/YYYY"
                            onChange={(value) => setStartAvailability(value)}
                            value={startAvailability}
                        />
                    </Box>
                    {/* preferedjob location */}
                    <Box mb="20px">
                        <Select
                            label="Preferred Job Location"
                            placeholder="Select your preferred job location"
                            required
                            data={[
                                { value: 'online', label: 'Online' },
                                { value: 'onsite', label: 'Onsite' },
                            ]}
                            onChange={(value) => setPrefJobLocation(value)}
                            value={prefJobLocation}
                        />
                    </Box>

                    {/* Upload CV */}
                    {   !state?.user?.cv &&
                        <Box mb="20px">
                        <FileInput
                            label="Upload CV"
                            accept=".pdf,.doc,.docx,.txt"
                            placeholder="Select your CV file"
                            required
                            onChange={(value) => setCvFile(value)}
                        />
                    </Box>
                    }

                    {/* button */}
                    <Box>
                        <Button type="submit" disabled={!isFormValid()}>
                            Apply
                        </Button>
                    </Box>
                </form>
            </Container>
            
        </MantineProvider>
        }
        {modal?.show && (
        <Modal
          show={modal?.show}
          title={modal?.title}
          body={modal?.body}
          handleClose={handleClose}
        />
      )}
        </div>

    );
};

export default ApplyScreen;
