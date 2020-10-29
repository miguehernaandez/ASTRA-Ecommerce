import React from 'react';
import s from '../../styles/loggin.module.css';
// import {useEffect} from 'react';
import {Button, Form, Container, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../multimedia/logo.png';

const Loggin = ()=>{

    // useEffect(()=> {
    //   document.body.style.backgroundColor = "blue"
    // }, [])
    
    return (         
        
            <div className={s.cont_prin}>			    				
            <div className={s.opac}>
                <Link to='/'>
                <img className={`${s.logo}`} src={logo}></img>
                </Link>            
         <Container className={s.cont}>
            <div className={s.img}>
            <FontAwesomeIcon className={s.icon}icon={faUserCircle} size={'7x'} />
            </div>
            <Form className={s.cont_form}>
            <Form.Group className={s.cont_input} controlId="formBasicEmail">
                <Form.Control className={s.input} type="email" placeholder="Enter email" />
                <FontAwesomeIcon className={s.icon2}icon={faEnvelope} size={'1x'} />
            </Form.Group>

            <Form.Group className={s.cont_input} controlId="formBasicPassword">
                <Form.Control className={s.input} type="password" placeholder="Password" />
                <FontAwesomeIcon className={s.icon2}icon={faLock} size={'1x'} />
            </Form.Group>
            <div className={s.forgot}><p>Forgot Password?</p></div>
            <Button className={s.button} type="submit">
                SING IN
            </Button>
            <Link to='/users'>
            <div className={s.reg}><p>Don´t have an account?  <span> Sign Up</span></p></div>
            </Link>            
            </Form>
        </Container>
        </div>
        </div>
        

            
    )
}
export default Loggin
