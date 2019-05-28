import * as React from 'react';
import lisbon from '../../static/lisbon.jpg';
import barcelona from '../../static/barcelona.jpg';
import berlin from '../../static/berlin.jpg';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactSVG from 'react-svg';
import flight from '../../static/flight.svg';
import car from '../../static/car.svg';
import house from '../../static/house.svg';
import taxi from '../../static/taxi.svg';
import { RouteComponentProps } from '@reach/router';

const styles = (theme: Theme) =>
    createStyles({
        slideLegend: {
            background: '#00AEEF',
            bottom: 10,
            left: 0,
            marginLeft: -6,
            width: 250,
            borderRadius: 4
        }
    });

export interface State {
    register: boolean;
}

type PropsWithStyles = RouteComponentProps & WithStyles<typeof styles>;

class Homepage extends React.Component<PropsWithStyles, State> {

    constructor(props: PropsWithStyles) {
        super(props);
        this.state = {
            register: false,
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div style={{ position: 'absolute', top: 75 }}>
                        <div style={{ margin: '0 auto', }}>
                            <Carousel showThumbs={false} autoPlay showArrows
                                showIndicators={false} showStatus={false} dynamicHeight infiniteLoop={true}
                                transitionTime={500}>
                                <div>
                                    <img src={lisbon}></img>
                                    <p className="legend" style={{ background: '#00AEEF', bottom: 10, left: 0, marginLeft: -6, width: 250, borderRadius: 4 }}> Lisbon, Book a Housing Now >> </p>
                                </div>
                                <div>
                                    <img src={barcelona}></img>
                                    <p className="legend" style={{ background: '#00AEEF', bottom: 10, left: 0, marginLeft: -6, width: 250, borderRadius: 4 }}> Barcelona, Book a Trip Now >> </p>
                                </div>
                                <div>
                                    <img src={berlin}></img>
                                    <p className="legend" style={{ background: '#00AEEF', bottom: 10, left: 0, marginLeft: -6, width: 250, borderRadius: 4 }}> Berlin, Book a Trip Now >> </p>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', width: '100%', top: 400, margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center', height: '200px', verticalAlign: 'top' }}>
                        Book a House
                        <div>
                            <ReactSVG src={house} beforeInjection={svg => {
                                svg.setAttribute('width', '70%')
                                svg.setAttribute('height', '70%')
                            }} />
                            View multiple Accomodations for your Trip and find the best houses with the best prices.
                        </div>
                    </div>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center', height: '200px', verticalAlign: 'top' }}>
                        Rent a Car
                        <ReactSVG src={car} beforeInjection={svg => {
                            svg.setAttribute('width', '50%')
                            svg.setAttribute('height', '50%')
                        }} />
                        Move faster during a trip by renting a car. The most recent cars with the best prices.
                    </div>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center', height: '200px', verticalAlign: 'top' }}>
                        Book a Trip
                        <div>
                            <ReactSVG src={flight} beforeInjection={svg => {
                                svg.setAttribute('width', '65%')
                                svg.setAttribute('height', '65%')
                            }} />
                            Go on vacations with booking and have the best flights guaranteed!
                        </div>
                    </div>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center', height: '200px', verticalAlign: 'top' }}>
                        Book a Taxi
                        <ReactSVG src={taxi} beforeInjection={svg => {
                            svg.setAttribute('width', '50%')
                            svg.setAttribute('height', '100%')
                        }} />

                        With Booking.com you can easily book a taxi to pick you from anywhere you want, anytime you want.
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);