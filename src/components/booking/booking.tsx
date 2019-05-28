import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Typography } from '@material-ui/core';
import peugeot from '../../static/peugeot.jpg'
import CarCards from './car/car';

class Booking extends React.Component<RouteComponentProps> {

    render() {
        return (
            <CarCards />
        )
    }
}

export default Booking;