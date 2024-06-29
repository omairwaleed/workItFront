import React, { useState } from "react";
import {
  MantineProvider,
  Textarea,
  Select,
  NumberInput,
  TextInput,
  Button,
  Box,
  Container,
  Title,
  Group,
  FileInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Modal from "../../components/Modal";
import dayjs from "dayjs";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const ExpextedSalaryScreen = () => {

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      border: "2px solid #001F54",
      borderRadius: "8px",
    },
    containerWithoutBorder: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
    },
    title: {
      textAlign: "center",
      color: "#001F54",
    },
    form: {
      marginTop: "20px",
    },
    submitButton: {
      backgroundColor: "#001F54",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "20px",
      fontSize: "16px",
    },
    disabledButton: {
      backgroundColor: "#cccccc",
      color: "#666666",
      cursor: "not-allowed",
    },
  };

  const { state } = useLocation();

  const isSalarySpecified = state?.state?.state?.salary === "0" ? false : true;
  const [startAvailability, setStartAvailability] = useState("");
  const [prefJobLocation, setPrefJobLocation] = useState("");
  const [cvFile, setCvFile] = useState("");
  const [modal, setModal] = useState({ show: false });
  const [isLoading, setIsLoading] = useState(false);
  const [salary, setSalary] = useState(
    isSalarySpecified ? state?.state?.state?.salary : ""
  );
  const [Currency, setCurrency] = useState(isSalarySpecified ? "USD" : "");

  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      salary &&
      Currency &&
      startAvailability &&
      prefJobLocation &&
      (state?.state?.user?.cv || cvFile)
    );
  };
  const handleClose = () => {
    setModal({ show: false });
    navigate("/myapps");
  };

  const onFinish = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const userid = state?.state?.user?.userid;
    const { requiredskills, jobid, jobtitle, companyname, country, city } =
      state?.state?.state;
    const englishLevel = state?.englishLevel;
    const yearsOfExp = state?.yearsOfExp;
    const formattedAvailabilityStart =
      dayjs(startAvailability).format("DD/MM/YYYY");
    const concatinatedExpectedSalary = salary + " " + Currency;

    try {
      if (!state?.state?.user?.cv) {
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
              userData: {
                cvURl: cvURl,
                cvName: cvFile.name,
                userid: state?.state?.user?.userid,
                onlyCv: true,
              },
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

      setIsLoading(false);
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
    const handleClose = () => {
        setModal({ show: false });
        navigate("/myapps");
    };

    const onFinish = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        const userid = state?.state?.user?.userid
        const { requiredskills, jobid, jobtitle, companyname, country, city } = state?.state?.state;
        const englishLevel = state?.englishLevel
        const yearsOfExp = state?.yearsOfExp
        const formattedAvailabilityStart = dayjs(startAvailability).format('DD/MM/YYYY')
        const concatinatedExpectedSalary = salary + " " + Currency;

        try {
            if (!state?.state?.user?.cv) {
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
                            userData: {
                                cvURl: cvURl,
                                cvName: cvFile.name,
                                userid: state?.state?.user?.userid,
                                onlyCv: true
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
  };
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

    const Expect = async (event) => {
        event.preventDefault();

        const { jobtitle, companyname, country, company_size } = state?.state?.state
        const englishLevel = state?.englishLevel
        const yearsOfExp = state?.yearsOfExp
        
        console.log('********************************', jobtitle, companyname, country, company_size, englishLevel, yearsOfExp)

        const url = 'https://accurate-viper-harmless.ngrok-free.app/predict';
        const data = {
            job_title: "Data Scientist",
            country: "United States",
            years_of_experience: 9,
            company_size: "S",
            company_name: "Microsoft",
            english_level: "Professional"
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'XMLHttpRequest'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            setSalary(result.prediction)
            setCurrency('USD')

        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div>
            {isLoading &&
                <MantineProvider theme={{ colorScheme: 'light', }}>
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

                        {/* expected salary */}
                        {isSalarySpecified ?
                            <Box mb="20px">
                                <Group>
                                    <TextInput
                                        label="Expected Salary"
                                        placeholder="Enter your expected salary"
                                        required
                                        readOnly
                                        style={{ flex: 3 }}
                                        value={salary}
                                    />
                                    <TextInput
                                        label="Currency"
                                        placeholder="Currency"
                                        required
                                        readOnly
                                        style={{ flex: 1 }}
                                        value={'USD'}
                                    />


                                </Group>
                            </Box>
                            :
                            <Box mb="20px">
                                <Group>
                                    <NumberInput
                                        label="Expected Salary"
                                        placeholder="Enter your expected salary"
                                        required
                                        style={{ flex: 2 }}
                                        onChange={(value) => {
                                            setSalary(value)
                                        }}
                                        value={salary}
                                    />
                                    <Select
                                        label="Currency"
                                        placeholder="Select currency"
                                        required
                                        style={{ flex: 1 }}
                                        data={[
                                            { value: 'USD', label: 'USD' },
                                            { value: 'EUR', label: 'EUR' },
                                            { value: 'EGY', label: 'EGY' },
                                            { value: 'GBP', label: 'GBP' },
                                            { value: 'INR', label: 'INR' },
                                        ]}
                                        onChange={(value) => {
                                            setCurrency(value)

                                            console.log('value is ; ', value)
                                        }
                                        }
                                        value={Currency}
                                    />
                                    <Button
                                        onClick={Expect}
                                        style={{ flex: 1, marginTop: 20 }}>
                                        Expect salary
                                    </Button>

                                </Group>
                            </Box>
                        }

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
                        {!state?.state?.user?.cv &&
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

                        {/* cover letter */}
                        <Box mb="20px">
                            <Textarea
                                label="Cover letter"
                                placeholder="Cover letter"

                            // onChange={(value) => setPrefJobLocation(value)}
                            // value={prefJobLocation}
                            />
                        </Box>

                        {/* How did you hear about us */}
                        <Box mb="20px">
                            <Select
                                label="How did you hear about us ?"
                                placeholder="How did you hear about us ?"
                                data={[
                                    { value: 'family/friends', label: 'Family / Friends' },
                                    { value: 'event', label: 'Event' },
                                    { value: 'social media', label: 'Social media' },
                                    { value: 'other', label: 'Other' },
                                ]}
                            // onChange={(value) => setPrefJobLocation(value)}
                            // value={prefJobLocation}
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
            }
            {modal?.show && (
                <Modal
                    show={modal?.show}
                    title={modal?.title}
                    body={modal?.body}
                    handleClose={handleClose}

                />
              </Box>

              {/* preferedjob location */}
              <Box mb="20px">
                <Select
                  label="Preferred Job Location"
                  placeholder="Select your preferred job location"
                  required
                  data={[
                    { value: "online", label: "Online" },
                    { value: "onsite", label: "Onsite" },
                  ]}
                  onChange={(value) => setPrefJobLocation(value)}
                  value={prefJobLocation}
                />
              </Box>

              {/* Upload CV */}
              {!state?.state?.user?.cv && (
                <Box mb="20px">
                  <FileInput
                    label="Upload CV"
                    accept=".pdf,.doc,.docx,.txt"
                    placeholder="Select your CV file"
                    required
                    onChange={(value) => setCvFile(value)}
                  />
                </Box>
              )}

              {/* cover letter */}
              <Box mb="20px">
                <Textarea
                  label="Cover letter"
                  placeholder="Cover letter"

                  // onChange={(value) => setPrefJobLocation(value)}
                  // value={prefJobLocation}
                />
              </Box>

              {/* How did you hear about us */}
              <Box mb="20px">
                <Select
                  label="How did you hear about us ?"
                  placeholder="How did you hear about us ?"
                  data={[
                    { value: "family/friends", label: "Family / Friends" },
                    { value: "event", label: "Event" },
                    { value: "social media", label: "Social media" },
                    { value: "other", label: "Other" },
                  ]}
                  // onChange={(value) => setPrefJobLocation(value)}
                  // value={prefJobLocation}
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
      )}
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

export default ExpextedSalaryScreen;
