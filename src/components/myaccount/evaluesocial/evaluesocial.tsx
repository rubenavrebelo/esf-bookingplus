import * as React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Icon, Button } from '@material-ui/core';
import george from '../../../static/george.jpg'
import athens from '../../../static/athens.jpg'
import paris from '../../../static/paris.jpg'
import kalkan from '../../../static/kalkan.jpg'
import nendaz from '../../../static/nendaz.jpg'
import pucon from '../../../static/pucon.jpg'
import telaviv from '../../../static/telaviv.jpg'
import { RouteComponentProps } from '@reach/router';
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

export interface InstagramPost {
    image: string;
    user: string;
    description: string;
    location: string;
}

const InstagramPosts: InstagramPost[] = [
    {
        image: telaviv,
        user: 'eurofan',
        description: 'Came for the eurovision, stayed for the pride! #bookingcom #lgbtqrights #eurovision',
        location: 'Tel Aviv, Israel'
    },
    {
        image: george,
        user: 'cvcampos',
        description: 'LOVE this place! Had such an amazing time at London and I couldnt be more happy! #booking.com #trip #travel',
        location: 'London, UK'
    },
    {
        image: athens,
        user: 'mrjoao',
        description: 'An amazing apartment with an amazing view. Cant wait to come back. #bookingcom #trip #athens',
        location: 'Athens, Greece'
    },
    {
        image: paris,
        user: 'mtrol',
        description: 'The streets of Paris... #bookingcom',
        location: 'Paris, France'
    },
    {
        image: kalkan,
        user: 'mrshine',
        description: 'Such a paradise, I just hoped there was more stuff to do... #bookingcom #ugh #trip',
        location: 'Kalkan, Turkey'
    },
    {
        image: nendaz,
        user: 'swish',
        description: 'I LOVE THE SNOW!!!!!!!!!!!!!!!!!!!! #bookingcom #snow #switzerland',
        location: 'Nendaz, Switzerland'
    },
    {
        image: pucon,
        user: 'soy',
        description: 'Amazing place. #bookingcom',
        location: 'Pucón, Chile'
    }
]

export interface State {
    instagramPost: number;
}

class EvaluateSocialMedia extends React.Component<RouteComponentProps, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            instagramPost: 1
        }
    }

    onUpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            instagramPost: this.state.instagramPost + 1 === InstagramPosts.length ? 0 : this.state.instagramPost + 1
        })
    }

    createInstaCard = () => {
        const instapost = InstagramPosts[this.state.instagramPost];
        const likes = Math.round(Math.random() * 100);
        const card = <div><Card style={{ width: '450px', height: '450px' }}>
            <CardHeader title={<div><Icon>account_circle</Icon>{instapost.user}</div>} subheader={<div><Icon>location_on</Icon> {instapost.location}</div>} />
            <CardMedia style={{ height: 0, paddingTop: '56.25%' }} image={instapost.image} />
            <CardContent>
                <Icon>thumb_up</Icon> {likes} Likes
                <Typography>{instapost.description}</Typography>
            </CardContent>
        </Card>
            <Typography style={{ marginLeft: '19%', marginTop: '10px' }}>Attributing: <b>{likes} points.</b></Typography></div>
        return card;
    }
    render() {
        return (
            <Card style={{ marginTop: '76px' }}>
                <CardContent style={{ paddingLeft: '35%' }}>
                    {this.createInstaCard()}
                    <div style={{ marginLeft: '14%' }}><Button onClick={this.onUpClick}><ThumbDown style={{ width: '100px', height: '50px', color: 'red' }} /></Button>
                        <Button onClick={this.onUpClick}><ThumbUp style={{ width: '100px', height: '50px', color: 'green' }} /></Button></div>
                </CardContent>
            </Card>
        );
    }
}

export default EvaluateSocialMedia;