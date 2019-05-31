import * as React from 'react';
import logo from '../../static/logo.png';
import { AppBar, ButtonBase, Theme, createStyles, withStyles, WithStyles, Toolbar, Avatar, MenuItem, Popper, Paper, MenuList, Icon, Grid, Typography, Button } from '@material-ui/core';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Register from '../homepage/register/register';
import Login from '../homepage/login/login';
import { Link, navigate } from '@reach/router';
import { UserData } from '../main';
import { Redirect } from 'react-router';

const styles = (theme: Theme) =>
    createStyles({
        AppBar: {
            background: 'white',
            position: 'absolute',
            height: '75px'
        },
        links: {
            position: 'fixed',
            right: '5%'
        },
        navButton: {
            marginLeft: '5px',
            marginRight: '5px',
            display: 'inline-block',
            width: '80px',
            color: 'black',
        },
        divButtons: {
            marginLeft: 'auto',
            marginRight: '5px'
        },
        logo: {
            marginLeft: '10px',
            width: '15%',
            userSelect: 'none'
        },
        avatar: {
            marginRight: '30px',
        },
        buttonText: {
            marginLeft: '5px',
            display: 'inline-block'
        }
    });

export interface State {
    register: boolean;
    login: boolean;
    menuOpen: boolean;
    isEmployee: boolean;
}

export interface Props {
    addNewUser: (firstName: string, lastName: string, email: string, password: string) => void;
    login: (email: string, password: string) => boolean;
    loggedIn: boolean;
    handleLoginPrompt: (event: React.MouseEvent<EventTarget>) => void;
    loggedInUser: UserData;
}

type PropsWithStyles = Props & WithStyles<typeof styles>;

function Navbar(props: PropsWithStyles) {
    const anchorRef = React.useRef(null);
    const [login, setLogin] = React.useState(false);
    const [menuOpen, setMenu] = React.useState(false);
    const [register, setRegister] = React.useState(false);

    function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
        setRegister(!register);
    }

    function handleCancelLogin(event: React.MouseEvent<HTMLButtonElement>) {
        setLogin(!login);
    }

    function handleChangeEvent(event: React.ChangeEvent<{}>) {
    }

    function handleMenu(event: React.MouseEvent<EventTarget>) {
        setMenu(!menuOpen)
    }

    function handleMenuEv(event: React.MouseEvent<EventTarget>) {
        setMenu(!menuOpen)
        navigate('/evsocial');
    }

    function handleLogout(event: React.MouseEvent<EventTarget>) {
        props.handleLoginPrompt(event);
        setMenu(false);
        handleHomeClick(event);
    }

    function handleHomeClick(event: React.MouseEvent<EventTarget>) {
        navigate('/');
    }

    function handleBookingsClick(event: React.MouseEvent<EventTarget>) {
        navigate('/booking');
    }

    function handleReportsClick(event: React.MouseEvent<EventTarget>) {
        navigate('/reportproblems');
    }


    return (<div>
        {register && <Register registerOpen={register}
            handleCancel={handleRegister} handleLogin={handleCancelLogin} addNewUser={props.addNewUser} />}
        {login &&
            <Login login={props.login} hideLogin={handleCancelLogin}
                handleCancel={handleCancelLogin} loginOpen={login} />}
        <AppBar className={classNames(props.classes.AppBar)} elevation={0}>
            <Toolbar>
                <img src={logo} className={classNames(props.classes.logo)} />
                <div className={classNames(props.classes.divButtons)}>
                    {props.loggedIn ?
                        <div>
                            <Button onClick={handleHomeClick}>Home</Button>
                            {props.loggedIn ? (((Object.keys(props.loggedInUser)[0]).split('@')[1]) === 'booking.com' ?
                                <Button onClick={handleReportsClick} style={{ marginRight: '600px' }}>View Reports</Button> :
                                <Button onClick={handleBookingsClick} style={{ marginRight: '650px' }}>Booking</Button>) : <div />}
                            <ButtonBase buttonRef={anchorRef}
                                onClick={handleMenu}
                                aria-owns={menuOpen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                className={classNames(props.classes.avatar)}>
                                <Avatar style={{ marginRight: '5px' }}>{props.loggedInUser[Object.keys(props.loggedInUser)[0]].firstName.charAt(0)}</Avatar>
                                <Typography style={{ color: 'black' }}> Hello, {props.loggedInUser[Object.keys(props.loggedInUser)[0]].firstName}</Typography><Icon style={{ color: 'black' }}>arrow_drop_down</Icon>
                            </ButtonBase>
                            <Popper open={menuOpen} anchorEl={anchorRef.current} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper id="menu-list-grow">
                                            <ClickAwayListener onClickAway={handleChangeEvent}>
                                                <MenuList>
                                                    <MenuItem onClick={handleMenu}>Profile</MenuItem>
                                                    {props.loggedIn ? (((Object.keys(props.loggedInUser)[0]).split('@')[1]) === 'booking.com') ? <MenuItem onClick={handleMenuEv}>Evalute Social</MenuItem> : <MenuItem onClick={handleMenu}><Link style={{ textDecoration: 'none', color: 'black' }} to="mybookings">My Bookings</Link></MenuItem> : <div />}
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}</Popper></div> : <div>
                            <ButtonBase className={classNames(props.classes.navButton)}
                                onClick={handleRegister}><Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <Icon>person_add</Icon>
                                    </Grid>
                                    <Grid item style={{ marginLeft: '5px' }}>
                                        Register
                                        </Grid>
                                </Grid>
                            </ButtonBase>
                            <ButtonBase className={classNames(props.classes.navButton)}
                                onClick={handleCancelLogin}>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <Icon>account_circle</Icon>
                                    </Grid>
                                    <Grid item style={{ marginLeft: '5px' }}>
                                        Login
                                        </Grid>
                                </Grid>
                            </ButtonBase>
                        </div>
                    }
                </div>
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default withStyles(styles)(Navbar);