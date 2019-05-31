import * as React from 'react';
import { Card, TextField, Select, CardContent, MenuItem, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Icon } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faDoorOpen, faSnowflake, faCogs, faGasPump, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Report } from '../mybookings/mybookings';
import peugeot from '../../../static/peugeot.jpg'
import polo from '../../../static/polo.jpg'
import citroen from '../../../static/citroen.jpg'

export interface Props {
    reportCollection: Report[];
}

class ReportProblem extends React.Component<Props & RouteComponentProps>{

    generateReports = () => {
        return this.props.reportCollection.map((report) => {
            const book = report.booking[Object.keys(report.booking)[0]];
            const writtenDate: Date = new Date(report.writtenDate);
            return (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container direction={'row'} alignItems={'center'}>
                        <Grid item style={{ marginRight: '60px', marginLeft: '40px' }}>
                            {Object.keys(report.booking)[0]}
                        </Grid>
                        <Grid item style={{ width: '140px', marginRight: '37px' }}>
                            {book.bookedCar.name}
                        </Grid>
                        <Grid item style={{ marginRight: '55px' }}>
                            {writtenDate.toLocaleDateString()}
                        </Grid>
                        <Grid item style={{ marginRight: '60px' }}>
                            {writtenDate.toLocaleTimeString()}
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
                        <Grid item style={{ marginLeft: '30px', height: '188px' }}>
                            <Typography variant={'h6'}> Report </Typography>
                            <Typography>Subject: {report.subject}</Typography>
                            <Typography>Description: {report.description}</Typography></Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>)
        }
        )
    }

    render() {
        return (<div style={{ marginTop: '85px' }}>
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
                            Report Date
                    </Grid>
                        <Grid item style={{ marginRight: '40px' }}>
                            Report Time
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {this.generateReports()}
        </div>);
    }
}

export default ReportProblem;