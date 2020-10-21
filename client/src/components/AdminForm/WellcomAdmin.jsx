import React from 'react'
import { Nav, Navbar, Form, Button, FormControl, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import s from '../styles/styles.module.css'

const WelcomeAdmin = ()=> {
    return (
        <div>
            <Jumbotron>
                    <h1>Hello, Wellcome ADMIN!</h1>
                    <p>
                        We're working to give you the best! comming soon!
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
            </Jumbotron>

        </div>
    )
}


export default WelcomeAdmin