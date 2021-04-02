import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100px',
    background: 'transparent',
  },
  menuButton: {
    marginRight: theme.spacing(4),
    height: '90px',
    width: '90px',
    background: 'transparent',
  },
  title: {
    flexGrow: 2,
    height: '150px',
  },
}));

export default function Header({ login, username, setLogin }) {
  const classes = useStyles();
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    setLogin(!login);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{
          background: 'transparent',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{ color: 'white' }}
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ fontSize: '30px', color: 'white' }}>
            Tripper, welcome {username}!
          </Typography>
          {auth && (
            <div style={{ float: 'right' }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <img
        alt="mountain"
        src="https://www.stormforge.io/wp-content/uploads/2020/10/mountain-scape.jpg"
        style={{ width: '100%' }}
      ></img>
    </div>
  );
}
