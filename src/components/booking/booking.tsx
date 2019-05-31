import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import CarCards, { BookingDetails } from './car/car';
import { CardContent, Card } from '@material-ui/core';

export interface State {
    isBooking: boolean;
}

export interface Props {
    addBooking: (booking: BookingDetails) => void;
}

type PropsDef = Props & RouteComponentProps;

class Booking extends React.Component<PropsDef> {
    constructor(props: PropsDef) {
        super(props);
    }

    getCarInfo = () => {

    }

    render() {
        return (
            <div>
                <CarCards addBooking={this.props.addBooking} />
            </div>
        )
    }
}

export default Booking;