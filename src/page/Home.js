import React, {Component} from 'react';
import {Button, Jumbotron} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'



class Home extends Component {
    render() {
        return (
            <Jumbotron id={'title-jumbotron'} className={'text-center ml-auto mr-auto'}>
                <h1>Welcome to Dictionary app page!</h1>
                <p>
                    Feel free to browse word translate or add your own!
                </p>
                <p>
                    <LinkContainer to={"/eng"}>
                        <Button variant={"secondary"} className={'mt-3 mr-4'}>
                            ENG-EST
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={"/est"}>
                        <Button variant={"secondary"} className={'mt-3'}>
                            EST-ENG
                        </Button>
                    </LinkContainer>
                </p>
            </Jumbotron>
        );
    }
}

export default Home;