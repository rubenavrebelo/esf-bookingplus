import * as React from 'react';
import { Router, Link } from '@reach/router';
import Homepage from './homepage/homepage';
import Booking from './booking/booking';
import Navbar from './navbar/navbar';
import _ from 'lodash';

export interface UserData {
    [email: string]: {
        firstName: string;
        lastName: string;
        password: string;
    }
}

export interface State {
    userCollection: UserData[];
    isLoggedIn: boolean;
    accountLoggedIn: UserData;
}

class Main extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            userCollection: [],
            isLoggedIn: false,
            accountLoggedIn: null
        }
    }

    addUser = (firstName: string, lastName: string, email: string, password: string) => {
        const newArr = [...this.state.userCollection];
        newArr.push({
            [email]: {
                firstName,
                lastName,
                password
            }
        });
        this.setState({
            userCollection: newArr
        }, () => localStorage.setItem('tests', JSON.stringify(this.state.userCollection)));
    }

    login = (email: string, password: string) => {
        const accPassword = (_.find(this.state.userCollection, email));
        if (accPassword) {
            if (accPassword[email].password === password) {
                this.setState({
                    isLoggedIn: true,
                    accountLoggedIn: accPassword
                });
                return true;
            }
        }
        return false;
    }

    handleLoginPrompt = (event:  React.MouseEvent<EventTarget>) => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        });
    }

    render() {
        return (<div>
            <Navbar handleLoginPrompt={this.handleLoginPrompt}
                loggedIn={this.state.isLoggedIn} addNewUser={this.addUser} login={this.login} />
            <Router>
                <Homepage path={'/'} />
                <Booking path={'booking'} />
            </Router>
        </div>
        );
    }
}

export default Main;