import * as React from 'react';
import { Card, CardContent, Typography, Icon, Grid, Button, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton, Collapse, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import peugeot from '../../../static/peugeot.jpg'
import polo from '../../../static/polo.jpg'
import citroen from '../../../static/citroen.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faDoorOpen, faSnowflake, faCogs, faGasPump, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { CarSpec, generateCars } from './cars';
import classNames from 'classnames';
import DateFnsUtils from "@date-io/date-fns";
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import BookingSVG from './bookingsvg';
import bgblur from '../../../static/bgblur.jpg'
import { DoneSVG } from './donesvg';

const styles = (theme: Theme) =>
    createStyles({
        card: {
            width: '48%',
            display: 'inline-block',
            marginTop: '10px',
            marginRight: '10px',
            marginLeft: '13px'
        },
        searchCard: {
            height: '350px',
            position: 'absolute',
            zIndex: 10,
            top: '180px',
            left: 0,
            width: '80%'
        },
        selects: {
            display: 'inline-block',
            marginLeft: '25px',
            marginRight: '15px',
        },
        datePicker: {
            marginRight: '15px'
        },
        searchResults: {
            height: '350px',
            position: 'absolute',
            zIndex: 10,
            top: '90px',
            left: 0,
        },
        cardBooking: {
            height: '450px',
            width: '100%',
            position: 'absolute',
            zIndex: 10,
            top: '70px',
            left: 0,
        }
    });

export interface SearchResult {
    shownCars: CarSpec[],
    location: string,
    deliverDate: Date,
    returnDate: Date,
}

export interface State {
    shownCars: CarSpec[];
    selectedLocation: string;
    selectedDate: Date;
    returnDate: Date;
    searched: boolean;
    booking: boolean;
    bookingCar: CarSpec;
    bookingDays: number;
    driverFirstName: string;
    driverLastName: string;
    driverAge: number;
    driverLicense: number;
    insuranceType: string;
    completed: boolean;
    bookingNumber?: number;
}

export interface BookingDetails {
    [bookingNumber: number]: {
        location: string;
        deliveryDate: Date;
        returnDate: Date;
        bookedCar: CarSpec;
        numberOfRentalDays: number;
        insuranceType: string;
        driverFirstName: string;
        driverLastName: string;
        driverAge: number;
        driverLicenseNumber: number;
    }
}

export interface Props {
    addBooking: (booking: BookingDetails) => void;
}

const defaultState: State = {
    shownCars: [],
    selectedLocation: 'default',
    selectedDate: new Date(),
    returnDate: new Date(),
    searched: false,
    booking: false,
    bookingCar: null,
    bookingDays: 0,
    driverFirstName: '',
    driverLastName: '',
    driverAge: 0,
    driverLicense: 0,
    insuranceType: '',
    completed: false
}

type PropsWithStyles = Props & WithStyles<typeof styles>;

class CarCards extends React.Component<PropsWithStyles, State> {
    constructor(props: PropsWithStyles) {
        super(props)
        this.state = {
            ...defaultState
        }
    }

    componentWillMount() {
        this.generateCars();
    }

    generateCars = () => {
        const carsArray = generateCars();
        this.setState({
            shownCars: carsArray
        });
    }

    handleBooking = (days: number, car: CarSpec) => (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            booking: true,
            bookingCar: car,
            bookingDays: days
        })
    }

    handleDriverFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            driverFirstName: event.target.value
        })
    }

    handleDriverLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            driverLastName: event.target.value
        })
    }

    handleDriverAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            driverAge: parseInt(event.target.value, 10)
        })
    }

    handleDriverLicense = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            driverLicense: parseInt(event.target.value, 10)
        })
    }

    handleInsurance = (event: React.ChangeEvent<HTMLButtonElement>) => {
        this.setState({
            insuranceType: event.target.value
        })
    }

    createCards = () => {
        const dayTime = 24 * 60 * 60 * 1000;
        let diffDays = Math.round(Math.abs((this.state.selectedDate.getTime() - this.state.returnDate.getTime()) / (dayTime)));
        if (diffDays === 0)
            diffDays = 1;
        return this.state.shownCars.map((car) => <Card className={classNames(this.props.classes.card)}>
            <CardContent>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item>
                        <img style={{ width: '70%' }} src={car.name === 'Peugeot 3008' ? peugeot : car.name === 'Volkswagen Polo' ? polo : citroen} />
                    </Grid>
                    <Grid item style={{ width: '45%' }}>
                        <Typography variant={'h6'}>{car.name}</Typography>
                        <div style={{ display: 'inline-block' }}><Icon>airline_seat_recline_normal</Icon>{car.seats} Seats</div><div style={{
                            width: '50px', height: '30px',
                            float: 'right', right: 0,
                            background: '#1C3E79', color: 'white',
                            borderRadius: '3px', textAlign: 'center',
                            lineHeight: '30px', display: 'inline-block'
                        }}>
                            <span style={{ verticalAlign: 'middle' }}>{(car.price * diffDays).toFixed(1)} €</span></div>
                        <div><FontAwesomeIcon icon={faSuitcase} />{car.largeBags} Large Bags</div>
                        <div><FontAwesomeIcon icon={faDoorOpen} />{car.doors} Doors</div>
                        <div><FontAwesomeIcon icon={faSnowflake} />{car.air ? 'Has Air Conditioning' : 'Does not have Air Conditioning'}</div>
                        <div><FontAwesomeIcon icon={faCogs} />{car.gearbox} Gearbox</div>
                        <div><FontAwesomeIcon icon={faGasPump} /> Fuel Policy {car.fuelPolicy}</div>
                        <div><FontAwesomeIcon icon={car.pontuation > 5 ? faStar : faStarHalf} /> {car.pontuation.toFixed(1)}</div>
                        <Button onClick={this.handleBooking(diffDays, car)} variant={'contained'} color={'primary'}>Book now!</Button>
                    </Grid>
                </Grid>
            </CardContent>
            <Collapse in={this.state.booking} timeout={'auto'} unmountOnExit>
                <CardContent>
                    <Typography>
                        abc
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>);
    }

    createBookingCard = (days: number, car: CarSpec) => {
        console.log(this.state.insuranceType !== '' && this.state.driverAge > 18 && this.state.driverFirstName !== '' && this.state.driverLastName !== '' && this.state.driverLicense.toString().length === 8);
        return (<Card className={classNames(this.props.classes.cardBooking)}>
            <CardContent>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item>
                        <img style={{ width: '70%' }} src={car.name === 'Peugeot 3008' ? peugeot : car.name === 'Volkswagen Polo' ? polo : citroen} />
                    </Grid>
                    <Grid item style={{ width: '45%' }}>
                        <Typography variant={'h6'}>{car.name}</Typography>
                        <div style={{ display: 'inline-block' }}><Icon>airline_seat_recline_normal</Icon>{car.seats} seats
                            <FontAwesomeIcon icon={faSuitcase} />{car.largeBags} Large Bags
                            <FontAwesomeIcon icon={faDoorOpen} />{car.doors} Doors
                            <FontAwesomeIcon icon={faSnowflake} />{car.air ? 'Has Air Conditioning' : 'Does not have Air Conditioning'}
                            <FontAwesomeIcon icon={faCogs} />{car.gearbox} Gearbox
                            <FontAwesomeIcon icon={faGasPump} /> Fuel Policy {car.fuelPolicy}
                            <FontAwesomeIcon icon={car.pontuation > 5 ? faStar : faStarHalf} /> {car.pontuation.toFixed(1)}</div>
                    </Grid>
                </Grid>
            </CardContent>
            <Collapse in={this.state.booking} timeout={'auto'} unmountOnExit>
                <CardContent>
                    <RadioGroup value={this.state.insuranceType} style={{ display: 'inline' }} onChange={this.handleInsurance}>
                        <FormControlLabel style={{ display: 'inline-block', width: '15%' }} value={'noInsurance'} control={<Radio />} label={'No Insurance'} />
                        <FormControlLabel style={{ display: 'inline-block', width: '20%' }} value={'fullInsurance'} control={<Radio />} label={'Full Insurance (+40€)'} />
                    </RadioGroup>
                    <div style={{ display: 'block' }}>Full Insurance covers:</div>
                    <div style={{ width: '250px', height: '400px', display: 'inline-block' }}><Typography variant={'subtitle2'}>The car's excess:</Typography><Typography variant={'body2'}> Your car comes with standard damage cover (CDW) with an excess and Theft Protection (TP) with an excess.If the bodywork is damaged or the car is stolen, the car hire company could charge you up to the excess amount – but Full Insurance will refund you.</Typography></div>
                    <div style={{ width: '250px', height: '400px', display: 'inline-block' }}><Typography variant={'subtitle2'}>Windows, mirrors, wheels and tyres:</Typography ><Typography variant={'body2'}>Protection products often have exclusions, but Full Insurance covers every exterior and mechanical part of your car, from wheels and windows to engine, roof and undercarriage.</Typography> </div>
                    <div style={{ width: '250px', height: '400px', display: 'inline-block' }}><Typography variant={'subtitle2'}>Administration and breakdown charges:</Typography><Typography variant={'body2'}>If you break down, lose your key(s) or lock yourself out, Full Insurance will refund any call-out charges, towing fees and key replacement costs.</Typography></div>
                    <div style={{ width: '3px', height: '150px', backgroundColor: 'lightgrey', display: 'inline-block', marginLeft: '20px', marginRight: '20px' }} />
                    <Typography style={{ position: 'absolute', bottom: '260px', right: '340px' }} variant={'h6'}>Driver Details</Typography>
                    <FormControl style={{ position: 'absolute', bottom: '75px', right: '275px' }}>
                        <TextField onChange={this.handleDriverFirstName} label={'First Name'}>First name</TextField>
                        <TextField onChange={this.handleDriverLastName} label={'Last Name'}>Last Name</TextField>
                        <TextField error={this.state.driverAge < 18 && this.state.driverAge > 1} onChange={this.handleDriverAge} label={'Age (must be atleast 18)'}>Age</TextField>
                        <TextField error={this.state.driverLicense.toString().length !== 8 && this.state.driverLicense.toString().length !== 1} onChange={this.handleDriverLicense} label={'Driver License (8 digits)'}>Driver License number</TextField>
                    </FormControl>
                    <div style={{ position: 'absolute', bottom: '128px', right: '30px' }}>
                        <Typography variant={'h6'}>Booking Details</Typography>
                        <Typography variant={'body2'}>Car: {this.state.bookingCar.name}</Typography>
                        <Typography variant={'body2'}>Location: {this.state.selectedLocation}</Typography>
                        <Typography variant={'body2'}>Delivery Date: {this.state.selectedDate.toLocaleDateString()} {this.state.selectedDate.toLocaleTimeString()}</Typography>
                        <Typography variant={'body2'}>Return Date: {this.state.returnDate.toLocaleDateString()} {this.state.returnDate.toLocaleTimeString()}</Typography>
                        <Typography variant={'body2'}>Total price: {(this.state.bookingCar.price * this.state.bookingDays + (this.state.insuranceType === 'fullInsurance' ? 40 : 0)).toFixed(1)} €</Typography>
                        <Button onClick={this.createNewBooking} disabled={this.state.insuranceType === '' || this.state.driverAge < 18 || this.state.driverFirstName === '' || this.state.driverLastName === '' || this.state.driverLicense.toString().length !== 8}>Confirm Booking Now</Button>
                    </div>
                </CardContent>
            </Collapse>
        </Card>);
    }

    confirmationPag = () => {
        return (<Card className={classNames(this.props.classes.searchCard)}>
            <CardContent>
                <div style={{ display: 'inline-block', width: '60%' }}>
                    <DoneSVG />
                </div>
                <div style={{ display: 'inline-block', width: '40%' }}>
                    <Typography variant={'h5'}> Car Booking success!</Typography>
                    <Typography>Reservation sucessfully created with the number <b>{this.state.bookingNumber}.</b></Typography>
                    <Typography>You will be contacted for delivery as soon as possible so that you can arrange the meeting place for delivery.</Typography>

                    <Typography>In case of any problem, you can contact Booking+ and we will try to help you as we can.</Typography>
                    <Typography>It was sent an invoice for your email with all the booking information.</Typography>
                </div>
            </CardContent>
        </Card>);
    }
    onDateChange = (date: Date) => {
        this.setState({
            selectedDate: date
        })
    }

    onReturnDateChange = (date: Date) => {
        this.setState({
            returnDate: date
        })
    }

    onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            selectedLocation: event.target.value
        })
    }

    onSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.state.selectedLocation !== 'default') {
            this.setState({
                searched: true
            })
        }
    }

    createNewBooking = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { selectedDate, selectedLocation, returnDate, bookingCar, bookingDays, insuranceType, driverFirstName, driverLastName, driverAge } = this.state;
        const bookingNum = 10000000 + Math.floor(Math.random() * 90000000);
        const booking: BookingDetails = {
            [bookingNum]: {
                location: selectedLocation,
                deliveryDate: selectedDate,
                returnDate,
                bookedCar: bookingCar,
                numberOfRentalDays: bookingDays,
                insuranceType,
                driverFirstName,
                driverLastName,
                driverAge,
                driverLicenseNumber: this.state.driverLicense
            }
        }
        this.props.addBooking(booking);

        this.setState({
            ...defaultState,
            completed: true,
            searched: true,
            booking: true,
            bookingNumber: bookingNum
        })
    }

    render() {
        return (
            <div style={{ marginTop: '70px', height: '100%', alignItems: 'center' }}>
                <div style={{ height: '575px', backgroundImage: `url(${bgblur})`, filter: 'blur(4px)', backgroundSize: 'cover', position: 'relative' }} />
                {!this.state.searched ?
                    <div style={{ height: '100%' }}>
                        <Card className={this.props.classes.searchCard}>
                            <CardContent>
                                <Grid container direction={'row'} alignItems={'center'}>
                                    <Grid item style={{ marginTop: '50px' }}>
                                        <BookingSVG />
                                    </Grid>
                                    <Grid item style={{ width: '620px', textAlign: 'center', marginTop: '60px' }}>
                                        <FormControl className={classNames(this.props.classes.selects)}>
                                            <InputLabel>Delivery Destination</InputLabel>
                                            <Select style={{ width: '170px', textAlign: 'left' }} value={this.state.selectedLocation} onChange={this.onSelectChange}>
                                                <MenuItem value={'default'} disabled>Choose a Location</MenuItem>
                                                <MenuItem value={'Lisbon'}>Lisbon</MenuItem>
                                                <MenuItem value={'Oporto'}>Oporto</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <DateTimePicker
                                                ampm={false}
                                                label={'Delivery Date'}
                                                className={this.props.classes.datePicker}
                                                minDate={this.state.selectedDate}
                                                maxDate={new Date("2020-01-01T00:00:00.000Z")}
                                                variant="inline" onChange={this.onDateChange}
                                                value={this.state.selectedDate}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <DateTimePicker
                                                ampm={false}
                                                label={'Return Date'}
                                                minDateMessage={'Date should be after delivery'}
                                                minDate={this.state.selectedDate} maxDate={new Date("2020-01-02T00:00:00.000Z")} variant="inline" onChange={this.onReturnDateChange} value={this.state.returnDate} />
                                        </MuiPickersUtilsProvider>
                                        <Button
                                            disabled={this.state.returnDate <= this.state.selectedDate || this.state.selectedLocation === 'default'}
                                            style={{ width: '70%', marginTop: '50px', }}
                                            variant={'outlined'}
                                            onClick={this.onSearch}>
                                            Search <Icon>search</Icon>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                    : !this.state.booking ? <Grid item className={classNames(this.props.classes.searchResults)} >
                        {this.createCards()}
                    </Grid> : !this.state.completed ?
                            <div className={classNames(this.props.classes.cardBooking)} >
                                {this.createBookingCard(this.state.bookingDays, this.state.bookingCar)}
                            </div> :
                            <div>
                                {this.confirmationPag()}
                            </div>}
            </div>
        );
    }
}

export default withStyles(styles)(CarCards);