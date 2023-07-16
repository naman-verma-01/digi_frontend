import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    Snackbar,
    IconButton,
    TableContainer,
    Alert,
    TablePagination,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: '', label: '', alignRight: false },
    { id: 'sno', label: 'S. No.', alignRight: false },
    { id: 'Name', label: 'Name', alignRight: false },
    { id: 'Email', label: 'Email', alignRight: false },
    { id: 'Mobile', label: 'Mobile', alignRight: false },
    { id: 'Address', label: 'Address', alignRight: false },
    { id: 'DOB', label: 'DOB', alignRight: false },
    { id: 'Actions', label: 'Actions', alignRight: false },
    { id: '', label: '', alignRight: false },

];
// ----------------------------------------------------------------------



export default function Invoices() {

    const navigate = useNavigate()


    // handle for snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // for snackbar
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

    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };




    // states used for filering
    const [filterString, setFilterString] = useState('');

    // state to hold all invoices
    const [users, setUsers] = useState([])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    useEffect(() => {
        getUsers();
        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    }, [])
 
    const getUsers = async () => {
        let res;
        const token = localStorage.getItem('accessToken')

        res = await fetch(`https://digi-backend.vercel.app/getAllUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })

        res = await res.json();

        setUsers(res.data)
    }

    const filteredUsers = users

    const isNotFound = !filteredUsers.length


    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jule', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


    const handleFilterByString = (event) => {

        setFilterString(event.target.value)

    };



    // executing side effect function whenever any state inside the 
    // given dependency array changes
    useEffect(() => {
        filterUsers()
    }, [filterString])


    // calling filter API using the filtering states
    const filterUsers = async () => {

        let res;
        const token = localStorage.getItem('accessToken')

        const uri = `https://digi-backend.vercel.app/filteredUser?matchString=${filterString}`

        res = await fetch(uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })

        res = await res.json();

        setUsers(res.data)
    }

    // function to call delete invoice API using the data of the specified invoice
    const deleteInvoice = async (_id) => {
        const token = localStorage.getItem('accessToken')

        let res = await fetch(`https://digi-backend.vercel.app/deleteUser?_id=${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`

            },
        })

        res = await res.json()

        if (res.msg === 'Successfull') {

            setOpen(true)
            const arr = users.filter((element) => element._id !== _id)

            setUsers(arr)

        }
    }

    useEffect(() => {
        console.log('rerendering')
    })


    const handleSortByName = (order) => {
        let arr;
        console.log('ORDER', order)
        if (order === 'ACS') {
            arr = users.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
        } else {
            arr = users.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0));
        }
        console.log("SORTING BY NAME", arr)

        setUsers([...arr])
    }

    const handleSortByMobile = () => {
        const arr = users.sort((a, b) => a.mobile - b.mobile);
        console.log("SORTING BY MOBILE", arr)

        setUsers([...arr])
    }


    const handleSortByDOB = () => {
        const arr = users.sort((a, b) => a.dob - b.dob);
        console.log("SORTING BY DOB", arr)

        setUsers([...arr])
    }

    return (
        <>
            <Helmet>
                <title> Users </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" sx={{}} gutterBottom>
                        Users
                    </Typography>

                </Stack>

                <LoadingButton size="large" type="submit" style={{ color: 'white', marginBottom: '20px', paddingLeft: '15px', paddingRight: '15px', borderRadius: '10px' }} variant="contained" onClick={() => { navigate('/dashboard/newUser') }}>
                    <Iconify icon='material-symbols:add' width={24} height={24} style={{ marginRight: '10px' }} />
                    New User
                </LoadingButton>
                <Card>
                    <UserListToolbar numSelected={selected.length} filterString={filterString} onFilterString={handleFilterByString} handleSortByName={handleSortByName} handleSortByMobile={handleSortByMobile} handleSortByDOB={handleSortByDOB} />

                    {users.length !== 0 ?


                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <UserListHead
                                        headLabel={TABLE_HEAD}
                                        rowCount={users.length}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody >
                                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            const { name, email, mobile, address, dob, _id } = row;

                                            return (
                                                <TableRow hover key={index} tabIndex={-1} role="checkbox" >

                                                    <TableCell align='left'>
                                                        { }
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        <b>{index + 1}</b>
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {name}
                                                    </TableCell>

                                                    <TableCell align='left'>
                                                        {email}
                                                    </TableCell>


                                                    <TableCell align="left">{mobile}</TableCell>
                                                    <TableCell align="left">{address}</TableCell>

                                                    <TableCell align="left">{`${new Date(dob).getDate()} ${months[new Date(dob).getMonth() + 1]}, ${new Date(dob).getFullYear()}`}</TableCell>

                                                    <TableCell align="right" style={{ display: 'flex' }}>

                                                        <LoadingButton fullWidth size="large" type="submit" sx={{ ':hover': { backgroundColor: 'rgba(250,0,0,0.8) !important' }, backgroundColor: 'rgba(250,0,0,0.6)' }} style={{ marginTop: '20px', marginRight: '10px' }} variant="contained" onClick={() => { deleteInvoice(_id) }}>
                                                            Delete
                                                        </LoadingButton>
                                                        <LoadingButton fullWidth size="large" type="submit" style={{ marginTop: '20px', marginRight: '10px' }} variant="contained" onClick={() => { navigate(`/dashboard/updateUser/${_id}`) }}>
                                                            Update
                                                        </LoadingButton>

                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <IconButton size="large" color="inherit" >
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>


                                                </TableRow>
                                            );
                                        })}

                                    </TableBody>

                                    {isNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <Paper
                                                        sx={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography variant="h6" paragraph>
                                                            Not found
                                                        </Typography>

                                                        <Typography variant="body2">
                                                            No results found for &nbsp;
                                                            <strong>&quot;{filterString}&quot;</strong>.
                                                            <br /> Try checking for typos or using complete words.
                                                        </Typography>
                                                    </Paper>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </Scrollbar>


                        : null}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>

            </Container>


            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Users Deleted Successfully!"
                action={action}
                severity="success"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Users Deleted Successfully !
                </Alert>
            </Snackbar>


        </>
    );
}
