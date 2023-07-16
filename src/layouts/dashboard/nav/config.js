// component
import Iconify from '../../../components/iconify/Iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;



const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'New User',
    path: '/dashboard/newUser',
    icon:  <Iconify icon="material-symbols:add" sx={{ color: 'text.disabled', width: 30, height: 30 }} />,
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Log Out',
    path: '/login',
    icon: icon('ic_lock'),
  }

  
 
];

export default navConfig;
