import React  from 'react';
import Navegacion from '../Navegacion/Navegacion';
import { Accordion, Navbar, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


var enlacesUser = [
      { text: 'Catalogo', to : '/products/catalogo'},
      { text: 'FAQs' , to: '/' },
      { text: 'Contacto', to: '/' },
      { text: 'Ayuda', to: '/' },
      { text: 'ADMIN', to: '/' },


];

export default function Faqs(){
  return(
    <Accordion defaultActiveKey="0">
      {/*pregunta 1*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          ¿ Que es Discover ?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Donde por fin encontraras todos los Productos para tu celular que estabas buscando, ademas de algunas cosas para cuidarte de COVID</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/*pregunta 2*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Click me!
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/*pregunta 3*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          ¿ Que es Discover ?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Donde por fin encontraras todos los Productos para tu celular que estabas buscando, ademas de algunas cosas para cuidarte de COVID</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/*pregunta 4*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          ¿ Que es Discover ?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Donde por fin encontraras todos los Productos para tu celular que estabas buscando, ademas de algunas cosas para cuidarte de COVID</Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>
  )
}
