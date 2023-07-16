import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
// import { Label } from '@material-ui/icons';

import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, InputLabel, Stack } from '@mui/material';
import SortUser from './SortUser';

// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'flex-between',
  padding: theme.spacing(0, 1, 0, 3),
  
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 420,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterString, onFilterString,handleSortByName, handleSortByMobile, handleSortByDOB }) {
  return (
    <StyledRoot
      sx={{
        justifyContent:"space-between"
      }}
    >

      <>

        <StyledSearch
          value={filterString}
          onChange={onFilterString}
          placeholder="Search User..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
        <SortUser handleSortByName={handleSortByName} handleSortByMobile={handleSortByMobile} handleSortByDOB={handleSortByDOB} />

      </>

    </StyledRoot>
  );
}
