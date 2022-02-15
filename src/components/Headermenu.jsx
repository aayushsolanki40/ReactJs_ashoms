import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PatternIcon from '@mui/icons-material/Pattern';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router';
import { LogoutUser } from '../API/LocalStore';

const Headermenu = (props) => {

  const {profileImg, username, anchorEl, open, handleClose, setIsUserLogin} = props;
  
  const logoutUser = () =>{
    LogoutUser();
    setIsUserLogin(false)
  }

  let navigate = useNavigate();

  function changePassPage() {
    navigate("/changepass");
  }

    return (
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem className='menuitemHeader' onClick={() => window.location.href ="/myprofile"}>
      <Avatar alt={username.charAt(0)} src={profileImg}  /> Profile
     </MenuItem>
      {/*  <MenuItem onClick={() => window.location.href ="/changepass"}>
      <PatternIcon /> Change Password
    </MenuItem>
        <MenuItem data-toggle="modal" data-target="#subscriptionModal">
      <VpnKeyIcon /> Subscription Level
    </MenuItem>
    <MenuItem>
      <GroupAddIcon />   Invite your Friend
    </MenuItem>*/}
    <Divider />
        <MenuItem className='menuitemHeader' onClick={() => window.location.href ="/settings"}>
      <ListItemIcon>
        <Settings fontSize="small" />
      </ListItemIcon>
      Settings
    </MenuItem> 
    <MenuItem className='menuitemHeader'
      onClick={()=>logoutUser()}
      // component={Link} to="/logout"
    >
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>

    );
}

export default Headermenu;
