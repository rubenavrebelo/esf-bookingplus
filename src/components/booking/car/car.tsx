import * as React from 'react';
import { Card, CardContent, Typography, Icon, Grid, Button, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
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
}

type PropsWithStyles = WithStyles<typeof styles>;

class CarCards extends React.Component<PropsWithStyles, State> {
    constructor(props: PropsWithStyles) {
        super(props)
        this.state = {
            shownCars: [],
            selectedLocation: 'default',
            selectedDate: new Date(),
            returnDate: new Date(),
            searched: false
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

    createCards = () => {
        const dayTime = 24 * 60 * 60 * 1000;
        let diffDays = Math.round(Math.abs((this.state.selectedDate.getTime() - this.state.returnDate.getTime()) / (dayTime)));
        if (diffDays === 0)
            diffDays = 1;
        console.log(Math.round(Math.abs((this.state.selectedDate.getTime() - this.state.returnDate.getTime()) / (dayTime))));
        return this.state.shownCars.map((car) => <Card className={classNames(this.props.classes.card)}>
            <CardContent>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item>
                        <img style={{ width: '70%' }} src={car.name === 'Peugeot 3008' ? peugeot : car.name === 'Volkswagen Polo' ? polo : citroen} />
                    </Grid>
                    <Grid item style={{ width: '45%' }}>
                        <Typography variant={'h6'}>{car.name}</Typography>
                        <Typography>
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

                            <Button variant={'contained'} color={'primary'}>Book now!</Button>
                        </Typography>
                    </Grid>
                </Grid>
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
        this.setState({
            searched: true
        })
    }

    render() {
        const nextDay = new Date();
        nextDay.setDate(this.state.selectedDate.getDate() + 1)
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
                                                minDate={nextDay} maxDate={new Date("2020-01-02T00:00:00.000Z")} variant="inline" onChange={this.onReturnDateChange} value={this.state.returnDate.getTime() === this.state.selectedDate.getTime() ? nextDay : this.state.returnDate} />
                                        </MuiPickersUtilsProvider>
                                        <Button
                                            disabled={this.state.returnDate < this.state.selectedDate}
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
                    : <Grid item className={classNames(this.props.classes.searchResults)} >
                        {this.createCards()}
                    </Grid>}
            </div>
        );
    }
}

export default withStyles(styles)(CarCards);