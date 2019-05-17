import * as React from 'react';
import logo from '../../static/logo.png';
import { AppBar, ButtonBase, Theme, createStyles, withStyles, WithStyles, Toolbar, Avatar, MenuItem, Popper, Paper, MenuList, Icon } from '@material-ui/core';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Register from '../homepage/register/register';
import Login from '../homepage/login/login';

const styles = (theme: Theme) =>
    createStyles({
        AppBar: {
            background: 'transparent',
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
            color: 'black'
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
        }
    });

export interface State {
    register: boolean;
    loggedIn: boolean;
    login: boolean;
    menuOpen: boolean;
}

type PropsWithStyles = WithStyles<typeof styles>;

class Navbar extends React.Component<PropsWithStyles, State> {
    private anchorEl: HTMLElement;
    constructor(props: PropsWithStyles) {
        super(props);
        this.state = {
            register: false,
            loggedIn: true,
            login: false,
            menuOpen: false
        }
        this.anchorEl = null;
    }

    handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            register: !this.state.register
        });
    }

    handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            login: !this.state.login
        });
    }

    handleChangeEvent = (event: React.ChangeEvent<{}>) => {
    }

    handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            loggedIn: false,
            menuOpen: false
        })
    }

    render() {
        return (<div>
            {this.state.register && <Register registerOpen={this.state.register}
                handleCancel={this.handleRegister} handleLogin={this.handleLogin} />}
            {this.state.login && <Login handleCancel={this.handleLogin} loginOpen={this.state.login} />}
            <AppBar className={classNames(this.props.classes.AppBar)} elevation={0}>
                <Toolbar>
                    <img src={logo} className={classNames(this.props.classes.logo)} />
                    <div className={classNames(this.props.classes.divButtons)}>
                        {this.state.loggedIn ?
                            <div>
                                <ButtonBase buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                    onClick={this.handleMenu}
                                    aria-owns={this.state.menuOpen ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    className={classNames(this.props.classes.avatar)}>
                                    <Avatar>H</Avatar>
                                </ButtonBase>
                                <Popper open={this.state.menuOpen} anchorEl={this.anchorEl} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleChangeEvent}>
                                                    <MenuList>
                                                        <MenuItem onClick={this.handleLogin}>Profile</MenuItem>
                                                        <MenuItem onClick={this.handleLogin}>My account</MenuItem>
                                                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}</Popper></div> : <div>
                                <ButtonBase className={classNames(this.props.classes.navButton)}
                                    onClick={this.handleRegister}><Icon>person_add</Icon>Register</ButtonBase>
                                <ButtonBase className={classNames(this.props.classes.navButton)}
                                    onClick={this.handleLogin}><Icon>account_circle</Icon>Login</ButtonBase></div>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

export default withStyles(styles)(Navbar);