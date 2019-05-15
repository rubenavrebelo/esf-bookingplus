import * as React from 'react';
import logo from '../../static/logo.png';
import lisbon from '../../static/lisbon.jpg';
import barcelona from '../../static/barcelona.jpg';
import berlin from '../../static/berlin.jpg';
import { AppBar, ButtonBase, Theme, createStyles, withStyles, WithStyles, Toolbar } from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import classNames from 'classnames';

const styles = (theme: Theme) =>
    createStyles({
        AppBar: {
            background: 'transparent',
            position: 'absolute',
            height: '75px'
        },
        links: {
            position: 'fixed',
            right: '5%'
        },
        navButton: {
            marginLeft: '5px',
            marginRight: '5px',
            display: 'inline-block',
            width: '75px',
            color: 'black'
        },
        card: {
            width: '50%',
            height: '50%'
        },
        logo: {
            marginLeft: '10px',
            width: '15%'
        }
    });

type PropsWithStyles = WithStyles<typeof styles>;

class Homepage extends React.Component<PropsWithStyles> {

    constructor(props: PropsWithStyles) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <AppBar className={classNames(this.props.classes.AppBar)} elevation={0}>
                        <Toolbar>
                            <img src={logo} className={classNames(this.props.classes.logo)} />
                            <div style={{ right: 0 }}>
                                <ButtonBase className={classNames(this.props.classes.navButton)}>Login</ButtonBase>
                                <ButtonBase className={classNames(this.props.classes.navButton)}>Register</ButtonBase>
                            </div>
                        </Toolbar>
                    </AppBar>
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
                                    <p className="legend" style={{ background: 'blue' }}> Barcelona, Book a Trip Now >> </p>
                                </div>
                                <div>
                                    <img src={berlin}></img>
                                    <p className="legend" style={{ background: 'blue' }}> Berlin, Book a Trip Now >> </p>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', width: '100%', top: 400, margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center' }}>
                        Rent a House
                    </div>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center' }}>

                        Rent a Taxi
                    </div>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center' }}>

                        Rent a Plane
                    </div>
                    <div style={{ display: 'inline-block', width: '25%', textAlign: 'center' }}>

                        Rent a Life
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);