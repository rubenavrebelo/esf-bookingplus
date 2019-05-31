import * as React from 'react';
import { BookingDetails } from '../../booking/car/car';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, CardContent, Card, Grid, Icon, Typography, Button, DialogContent, Dialog, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RouteComponentProps } from '@reach/router';
import peugeot from '../../../static/peugeot.jpg';
import polo from '../../../static/polo.jpg';
import citroen from '../../../static/citroen.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faDoorOpen, faSnowflake, faCogs, faGasPump, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

export interface Props {
    bookings: BookingDetails[];
    addReport: (report: Report) => void;
}

export interface State {
    reporting: boolean;
    reportBooking: BookingDetails;
    subject: string;
    description: string;
}

export interface Report {
    booking: BookingDetails;
    writtenDate: Date;
    subject: string;
    description: string;
}

class MyBookings extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
            reporting: false,
            reportBooking: null,
            subject: '',
            description: ''
        }
    }
    mapBookings = () => {
        return this.props.bookings.map((booking: BookingDetails) => {

            const book = booking[Object.keys(booking)[0]];
            const date: Date = new Date(book.deliveryDate);
            const returnDate = new Date(book.returnDate)
            return (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container direction={'row'} alignItems={'center'}>
                        <Grid item style={{ marginRight: '60px', marginLeft: '40px' }}>
                            {Object.keys(booking)[0]}
                        </Grid>
                        <Grid item style={{ width: '140px', marginRight: '40px' }}>
                            {book.bookedCar.name}
                        </Grid>
                        <Grid item style={{ marginLeft: '5px', marginRight: '60px' }}>
                            {date.toLocaleDateString()}
                        </Grid>
                        <Grid item style={{ marginRight: '60px' }}>
                            {date.toLocaleTimeString()}
                        </Grid>
                        <Grid item style={{ marginRight: '60px' }}>
                            {returnDate.toLocaleDateString()}
                        </Grid>
                        <Grid item style={{ marginRight: '60px' }}>
                            {returnDate.toLocaleTimeString()}
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction={'row'} alignItems={'center'}>
                        <Grid item>
                            <img src={book.bookedCar.name === 'Peugeot 3008' ? peugeot : book.bookedCar.name === 'Citroen C4 Cactus' ? citroen : polo} />
                        </Grid>
                        <Grid item style={{ marginLeft: '50px' }}>
                            <Grid item><Typography variant={'h6'}>{book.bookedCar.name}</Typography></Grid>
                            <Grid item><Icon>airline_seat_recline_normal</Icon>{book.bookedCar.seats} Seats</Grid>
                            <Grid item><FontAwesomeIcon icon={faSuitcase} />{book.bookedCar.largeBags} Large Bags</Grid>
                            <Grid item><FontAwesomeIcon icon={faDoorOpen} />{book.bookedCar.doors} Doors</Grid>
                            <Grid item><FontAwesomeIcon icon={faSnowflake} />{book.bookedCar.air ? 'Has Air Conditioning' : 'Does not have Air Conditioning'}</Grid>
                            <Grid item><FontAwesomeIcon icon={faCogs} />{book.bookedCar.gearbox} Gearbox</Grid>
                            <Grid item><FontAwesomeIcon icon={faGasPump} /> Fuel Policy {book.bookedCar.fuelPolicy}</Grid>
                            <Grid item><FontAwesomeIcon icon={book.bookedCar.pontuation > 5 ? faStar : faStarHalf} /> {book.bookedCar.pontuation.toFixed(1)}</Grid>
                        </Grid>
                        <Grid item style={{ height: '188px', marginLeft: '30px' }}>
                            <Grid item><Typography variant={'h6'}>Driver Details</Typography></Grid>
                            <Grid item>First Name: {book.driverFirstName} </Grid>
                            <Grid item>Last Name: {book.driverLastName} </Grid>
                            <Grid item>Age: {book.driverAge} </Grid>
                            <Grid item>License Number: {book.driverLicenseNumber} </Grid>
                            <Grid item><Typography variant={'h6'}>Insurance</Typography></Grid>
                            <Grid item>{book.insuranceType === 'fullInsurance' ? 'Full Insurance (+40€)' : 'No Insurance'}</Grid>
                        </Grid>
                        <Grid item style={{ height: '188px', marginLeft: '40px' }}>
                            <Grid item><Typography variant={'h6'}>Total Price:</Typography></Grid>
                        </Grid>
                        <Grid item style={{ height: '180px', marginLeft: '40px' }}>
                            <Grid item>{book.numberOfRentalDays} * {book.bookedCar.price.toFixed(1)} € <Typography variant={'caption'}>(Days * Base price)</Typography></Grid>
                            <Grid item>+ <div style={{ display: 'inline-block', marginLeft: '8px' }}>{book.insuranceType === 'fullInsurance' ? '40' : '0'}</div> € <Typography variant={'caption'}>(Insurance price)</Typography></Grid>
                            <Grid item style={{ height: '2px', width: '185px', backgroundColor: 'lightgrey' }} />
                            <Grid item>{((book.numberOfRentalDays * book.bookedCar.price) + (book.insuranceType === 'fullInsurance' ? 40 : 0)).toFixed(1)} € <Typography variant={'caption'}>(Days * Base price)</Typography></Grid>

                            <Button onClick={this.handleReport(booking)} color={'primary'} variant={'contained'} style={{ marginTop: '50px' }}>Report Problem</Button>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>)
        }
        )
    }

    handleReport = (booking: BookingDetails) => (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            reporting: true,
            reportBooking: booking
        })
    }

    handleClose = (event: React.MouseEvent<HTMLDialogElement>) => {
        this.setState({
            reporting: false
        })
    }

    handleSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            subject: event.target.value
        })
    }

    handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: event.target.value
        })
    }

    createReport = (event: React.MouseEvent<HTMLButtonElement>) => {
        const writtenDate = new Date();
        const newReport: Report = {
            booking: this.state.reportBooking,
            writtenDate,
            subject: this.state.subject,
            description: this.state.description
        }
        this.props.addReport(newReport);
        this.setState({
            reporting: false
        })
    }

    render() {
        return (
            <div style={{ marginTop: '85px' }}>
                <Card>
                    <CardContent>
                        <Grid container direction={'row'} alignItems={'center'}>
                            <Grid item style={{ marginRight: '60px', marginLeft: '40px' }}>
                                Reservation ID
                            </Grid>
                            <Grid item style={{ marginRight: '60px' }}>
                                Car Name
                            </Grid>
                            <Grid item style={{ marginLeft: '20px', marginRight: '40px' }}>
                                Delivery Date
                            </Grid>
                            <Grid item style={{ marginRight: '40px' }}>
                                Delivery Time
                            </Grid>
                            <Grid item style={{ marginRight: '50px' }}>
                                Return Date
                            </Grid>
                            <Grid item style={{ marginRight: '40px' }}>
                                Return time
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                {this.props.bookings.length !== 0 ?
                    <div>{this.mapBookings()}
                        <Dialog open={this.state.reporting} onClose={this.handleClose}>
                            <DialogContent>
                                <Grid container direction={'column'} style={{ marginLeft: '20px', float: 'left' }}>
                                    <Grid item><Typography variant={'h5'}>Report of Booking Problem</Typography></Grid>
                                    <Grid item><Typography variant={'h6'}>No. {this.state.reportBooking ? Object.keys(this.state.reportBooking)[0] : ''}</Typography></Grid>
                                    <Grid item><TextField onChange={this.handleSubject} style={{ width: '200px' }} label={'Problem Subject'} /></Grid>
                                    <Grid item><TextField onChange={this.handleDescription} style={{ width: '500px' }} rows={4} multiline label={'Description of the problem'} /></Grid>
                                </Grid>
                                <Button onClick={this.createReport} style={{ marginTop: '30px', float: 'right' }}>Send Problem Report</Button>
                            </DialogContent>
                        </Dialog>
                    </div> :
                    <Typography variant={'h4'} style={{ textAlign: 'center' }}>Sorry, no booking was found!</Typography>}
            </div >
        );
    }

}

export default MyBookings;