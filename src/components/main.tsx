import * as React from 'react';
import { Router, Link } from '@reach/router';
import Homepage from './homepage/homepage';
import Booking from './booking/booking';
import Navbar from './navbar/navbar';
import _ from 'lodash';
import { BookingDetails } from './booking/car/car';
import MyBookings, { Report } from './myaccount/mybookings/mybookings';
import ReportProblem from './myaccount/reporting/reportproblem';
import EvaluateSocialMedia from './myaccount/evaluesocial/evaluesocial';

export interface UserData {
    [email: string]: {
        firstName: string;
        lastName: string;
        password: string;
        bookingCollection: BookingDetails[];
    }
}

export interface State {
    userCollection: UserData[];
    isLoggedIn: boolean;
    accountLoggedIn: UserData;
    reportCollection: Report[];
}

class Main extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            userCollection: [],
            isLoggedIn: false,
            accountLoggedIn: null,
            reportCollection: []
        }
    }

    componentWillMount() {
        const ls = localStorage.getItem('tests');
        if (ls) {
            const lsState: State = JSON.parse(ls);
            this.setState({
                ...lsState
            })
        }
    }

    addReport = (report: Report) => {
        const newArr = this.state.reportCollection.slice();
        newArr.push(report);
        this.setState({
            reportCollection: newArr
        }, () => localStorage.setItem('tests', JSON.stringify(this.state)));
    }

    addBooking = (booking: BookingDetails) => {
        const userData = this.state.accountLoggedIn;
        userData[Object.keys(userData)[0]].bookingCollection.push(booking);
        const newUserCollection = [...this.state.userCollection];
        newUserCollection.push({
            ...userData
        });

        this.setState({
            accountLoggedIn: userData,
            userCollection: newUserCollection
        }, () => localStorage.setItem('tests', JSON.stringify(this.state)));
    }

    addUser = (firstName: string, lastName: string, email: string, password: string) => {
        const newArr = [...this.state.userCollection];
        newArr.push({
            [email]: {
                firstName,
                lastName,
                password,
                bookingCollection: []
            }
        });
        this.setState({
            userCollection: newArr
        }, () => localStorage.setItem('tests', JSON.stringify(this.state)));
    }

    login = (email: string, password: string) => {
        const accPassword = (_.find(this.state.userCollection, email));
        if (accPassword) {
            if (accPassword[email].password === password) {
                this.setState({
                    isLoggedIn: true,
                    accountLoggedIn: accPassword
                }, () => localStorage.setItem('tests', JSON.stringify(this.state)));
                return true;
            }
        }
        return false;
    }

    handleLoginPrompt = (event: React.MouseEvent<EventTarget>) => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        }, () => localStorage.setItem('tests', JSON.stringify(this.state)));
    }

    render() {
        return (<div>
            <Navbar handleLoginPrompt={this.handleLoginPrompt} loggedInUser={this.state.accountLoggedIn}
                loggedIn={this.state.isLoggedIn} addNewUser={this.addUser} login={this.login} />
            <Router>
                <Homepage path={'/'} />
                <Booking addBooking={this.addBooking} path={'booking'} />
                <MyBookings addReport={this.addReport} bookings={this.state.isLoggedIn ? this.state.accountLoggedIn[Object.keys(this.state.accountLoggedIn)[0]].bookingCollection : []} path={'/mybookings'} />
                <ReportProblem reportCollection={this.state.reportCollection ? this.state.reportCollection : []} path={'/reportproblems'} />
                <EvaluateSocialMedia path={'evsocial'} />
            </Router>
        </div>
        );
    }
}

export default Main;