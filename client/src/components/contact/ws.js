import React, { Component, useState } from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ws from '../../multimedia/ws.png';
import s from '../../styles/contact.module.css';


function Contact(){

    const cod = '+' + 549;
    const cel = 1123889585;

   return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <a href={`https://api.whatsapp.com/send?phone=${cod}${cel}`}>
                         <Image className={s.size} src={ws} roundedCircle/>
                    </a>
                </Col>
            </Row>
    </Container>
    )
}

export default Contact;
