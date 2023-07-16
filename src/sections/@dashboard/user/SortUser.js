import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import Iconify from '../../../components/iconify/Iconify';

import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: 'eva:home-fill',
    },
    {
        label: 'Profile',
        icon: 'eva:person-fill',
    },
    {
        label: 'Settings',
        icon: 'eva:settings-2-fill',
    },
];

// ----------------------------------------------------------------------

export default function SortUser({handleSortByName, handleSortByMobile, handleSortByDOB}) {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
            <Iconify sx={{margin:'10px', padding:'1px'}}  icon="ic:round-filter-list" />


            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        Sort By
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    <MenuItem onClick={()=> handleSortByName('ACS') }>
                        Name (ACS)
                    </MenuItem>
                    <MenuItem onClick={()=> handleSortByName('DCS')}>
                        Name (DCS)
                    </MenuItem>
                    {/* <MenuItem onClick={handleSortByDOB}>
                        DOB
                    </MenuItem>
                    <MenuItem onClick={handleSortByMobile}>
                        Mobile
                    </MenuItem> */}
                </Stack>

               
            </Popover>
        </>
    );
}
