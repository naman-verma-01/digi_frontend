import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

// @mui

import { styled } from '@mui/material/styles';

import {
    Stack,
    Container,
    Typography,
    IconButton,
    TextField,
    Snackbar,
    Alert,
    InputLabel,
} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Authenticate from './Authenticate';


// ----------------------------------------------------------------------



const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 1000,
    margin: 'auto',
    maxHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));



// ----------------------------------------------------------------------




export default function NewInvoice() {


    const [open, setOpen] = useState(false);
    const [failedOpen, setFailedOpen] = useState(false);
    const [infoMissingOpen, setInfoMissingOpen] = useState(false);
    const [missionIn, setMissionIn] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        mobile: 0,
        address: '',
        dob: 0,
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleFailedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFailedOpen(false);
    };


    const handleMissingInfoClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
        }
        setInfoMissingOpen(false);
    }

    const action = (
        <>

            <IconButton
                size="small"
                aria-label="close"
                color="red"
                onClick={handleClose}
            >
                Close
            </IconButton>
        </>
    );


    const missinfInfoaction = (
        <>

            <IconButton
                size="small"
                aria-label="close"
                color="red"
                onClick={handleMissingInfoClose}
            >
                Close
            </IconButton>
        </>
    );


 

// function to handle calling new User API
const handleClick = async () => {

    // basic validation


    let string = ''
    if (user.name === '') {
        string += ' NAME'
    }
    if (user.email === '') {
        string += ' EMAIL'
    }
    /* eslint-disable no-useless-escape */
    else if(! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))){
        string += ' EMAIL'
    }
    if (user.password === '') {
        string += ' PASSWORD'
    }
    if (user.mobile === 0 && toString(user.mobile).length !== 10) {
        string += ' MOBILE'
    }
    if (user.address === '') {
        string += ' ADDRESS'
    }
    if (user.dob === 0) {
        string += ' DOB'
    }

    if (string !== '') {
        setMissionIn(string)
        setInfoMissingOpen(true)
    }
    else {
        const bodyData = { ...user, dob: new Date(user.dob).getTime() }

        const token = localStorage.getItem('accessToken')

        bodyData.date = new Date(bodyData.date).getTime()
        let res = await fetch('https://digi-backend.vercel.app/newUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyData),
        })

        res = await res.json()

        if (res.msg === 'Successfull') {
            // opening success snack bar
            setOpen(true)

            setUser({
                name: '',
                email: '',
                password: '',
                mobile: 0,
                address: '',
                dob: 0,
            })
        } else {
            // Opening Failed Snackbar
            setFailedOpen(true)

        }
    }


}



return (
    <>
        <Authenticate/>
        <Helmet>
            <title> New User </title>
        </Helmet>

        <Container >
            <StyledContent>
                <Typography variant="h4" textAlign='center' marginBottom={5} gutterBottom>
                    Create a New User
                </Typography>

                <Stack spacing={2}>

                    <TextField required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="Name" value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} label="Name" />
                    <TextField required name="Email" value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} label="Email" />
                    <TextField required name="Password" value={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} label="Password" />
                    <TextField required name="Address" value={user.address} onChange={(event) => setUser({ ...user, address: event.target.value })} label="Address" />
                    <TextField required name="Mobile Number" value={user.mobile} onChange={(event) => setUser({ ...user, mobile: event.target.value })} label="Mobile Number" />
                    <InputLabel required>DOB</InputLabel>
                    <input type="date" id="start" name="trip-start" value={user.dob} onChange={(event) => setUser({ ...user, dob: event.target.value })} />

                </Stack>


                <div style={{ marginTop: '20px' }}>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                        Publish
                    </LoadingButton>
                </div>


            </StyledContent>
        </Container>

        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="User Request SuccessFull !"
            action={action}
            severity="success"
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                User Request SuccessFull !
            </Alert>
        </Snackbar>

        <Snackbar
            open={failedOpen}
            autoHideDuration={2000}
            onClose={handleFailedClose}
            message="User Request Failed! Invalid Request."
            action={action}
            severity="error"
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                User Request Failed! Invalid Request.
            </Alert>
        </Snackbar>


        <Snackbar
            open={infoMissingOpen}
            autoHideDuration={2000}
            onClose={handleMissingInfoClose}
            message="User Request Failed! Invalid Request."
            action={missinfInfoaction}
            severity="error"
        >
            <Alert onClose={handleMissingInfoClose} severity="error" sx={{ width: '100%' }}>
                Missing / Invalid Information ...<br />
                {missionIn}
            </Alert>
        </Snackbar>



    </>
);
}
