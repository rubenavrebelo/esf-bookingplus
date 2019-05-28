import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ButtonBase, TextField } from '@material-ui/core';
import classNames from 'classnames';

export interface Props {
    loginOpen: boolean;
    handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    login: (email: string, password: string) => boolean;
    hideLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface State {
    loging: boolean;
    email: string;
    password: string;
    error: boolean;
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loging: props.loginOpen,
            email: '',
            password: '',
            error: false
        }
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        });
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value
        });
    }

    handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.login(this.state.email, this.state.password)) {
            this.props.hideLogin(event);
            this.setState({
                error: false
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        return (<Dialog open={this.props.loginOpen}
            onClose={this.props.handleCancel}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Email
                </DialogContentText>
                <TextField onChange={this.handleEmailChange} error={this.state.error}></TextField>
                <DialogContentText>
                    Password
                </DialogContentText>
                {this.state.error ? <TextField error={this.state.error} helperText={'Email or password is wrong!'} onChange={this.handlePasswordChange} type={'password'}></TextField>
                    : <TextField onChange={this.handlePasswordChange} type={'password'}></TextField>}
            </DialogContent>
            <DialogActions>
                <ButtonBase onClick={this.props.handleCancel}>Cancel</ButtonBase>
                <ButtonBase onClick={this.handleLogin}>Login</ButtonBase>
            </DialogActions>
        </Dialog>
        );
    }
}

export default Login;