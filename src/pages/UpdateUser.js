import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

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
} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';


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




export default function UpdateInvoice(props) {

    const params = useParams()
    const [open, setOpen] = useState(false);
    const [failedOpen, setFailedOpen] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        mobile: 0,
        address: '',
        dob: 0,
    })

    useEffect(() => {
        getUserById(params.id)
    }, [])

 

    const getUserById = async (id) => {

        const token = localStorage.getItem('accessToken')
        let data = await fetch(`https://digi-backend.vercel.app/getUserById?_id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })

        data = await data.json()

        console.log("USER BY ID==>", data.data[0])

        setUser(data.data[0])
    }

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



    // function to handle calling new Invoice API
    const handleClick = async () => {

        const bodyData = { ...user }

        const token = localStorage.getItem('accessToken')


        // bodyData.date = new Date(bodyData.date).getTime()
        let res = await fetch('https://digi-backend.vercel.app/updateUser', {
            method: "PUT",
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

        } else {
            // Opening Failed Snackbar
            setFailedOpen(true)

        }
    }



    return (
        <>
            <Helmet>
                <title> Update User </title>
            </Helmet>

            <Container >
                <StyledContent>
                    <Typography variant="h4" textAlign='center' marginBottom={5} gutterBottom>
                        Update User
                    </Typography>

                    <Stack spacing={2}>

                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="Name" value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} label="Name" />
                        <TextField name="Email" value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} label="Email" />
                        <TextField name="Password" value={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} label="Password" />
                        <TextField name="Address" value={user.address} onChange={(event) => setUser({ ...user, address: event.target.value })} label="Address" />
                        <TextField name="Mobile Number" value={user.mobile} onChange={(event) => setUser({ ...user, mobile: event.target.value })} label="Mobile Number" />

                        <input type="date" id="start" name="trip-start" value={user.dob} onChange={(event) => setUser({ ...user, dob: event.target.value })} />


                    </Stack>


                    <div style={{ marginTop: '20px' }}>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                            Update
                        </LoadingButton>
                    </div>


                </StyledContent>
            </Container>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="User Update SuccessFull !"
                action={action}
                severity="success"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User Update SuccessFull !
                </Alert>
            </Snackbar>

            <Snackbar
                open={failedOpen}
                autoHideDuration={2000}
                onClose={handleFailedClose}
                message="Update Request Failed! Invalid Request."
                action={action}
                severity="error"
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Update Request Failed! Invalid Request.
                </Alert>
            </Snackbar>



        </>
    );
}
