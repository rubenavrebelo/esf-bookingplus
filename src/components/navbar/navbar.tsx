import * as React from 'react';
import logo from '../../static/logo.png';
import { AppBar, ButtonBase, Theme, createStyles, withStyles, WithStyles, Toolbar, Avatar, MenuItem, Popper, Paper, MenuList, Icon, Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Register from '../homepage/register/register';
import Login from '../homepage/login/login';
import { Link } from '@reach/router';

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
            width: '75px',
            color: 'black',
        },
        divButtons: {
            marginLeft: 'auto',
            marginRight: 0
        },
        logo: {
            marginLeft: '10px',
            width: '15%',
            userSelect: 'none'
        },
        avatar: {
            marginRight: '30px'
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
}

export interface Props {
    addNewUser: (firstName: string, lastName: string, email: string, password: string) => void;
    login: (email: string, password: string) => boolean;
    loggedIn: boolean;
    handleLoginPrompt: (event: React.MouseEvent<EventTarget>) => void;
}

const initialState: State = {
    register: false,
    login: false,
    menuOpen: false
}

type PropsWithStyles = Props & WithStyles<typeof styles>;

function Navbar(props: PropsWithStyles) {
    const anchorRef = React.useRef<HTMLButtonElement>(null);
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

    function handleLogout(event: React.MouseEvent<EventTarget>) {
        props.handleLoginPrompt(event);
        setMenu(false);
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
                            <Link to="booking">Booking</Link>
                            <ButtonBase buttonRef={this.anchorRef}
                                onClick={handleMenu}
                                aria-owns={menuOpen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                className={classNames(props.classes.avatar)}>
                                <Avatar>H</Avatar>
                                <Typography> Hello, Rúben</Typography>
                            </ButtonBase>
                            <Popper open={menuOpen} anchorEl={this.anchorRef.current} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper id="menu-list-grow">
                                            <ClickAwayListener onClickAway={handleChangeEvent}>
                                                <MenuList>
                                                    <MenuItem onClick={handleMenu}>Profile</MenuItem>
                                                    <MenuItem onClick={handleMenu}>My account</MenuItem>
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
                                    <Grid item>
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
                                    <Grid item>
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