import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ButtonBase, TextField } from '@material-ui/core';
import classNames from 'classnames';

export interface Props {
    loginOpen: boolean;
    handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface State {
    loging: boolean;
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loging: props.loginOpen,
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
                <TextField></TextField>
                <DialogContentText>
                    Password
                </DialogContentText>
                <TextField type={'password'}></TextField>
            </DialogContent>
            <DialogActions>
                <ButtonBase onClick={this.props.handleCancel}>Cancel</ButtonBase>
                <ButtonBase>Login</ButtonBase>
            </DialogActions>
        </Dialog>
        );
    }
}

export default Login;