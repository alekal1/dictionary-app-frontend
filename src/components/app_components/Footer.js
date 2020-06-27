import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <Navbar expand={"md"} fixed={"bottom"} id='footer' className='mt-auto bg-dark text-white'>
                <div className="ml-md-4">
                    <span>Aleksandr Aleksandrov &copy; 2020 Telia.</span>
                    <p>Made for Telia</p>
                </div>
            </Navbar>
        );
    }
}

export default Footer;