import React, {useState, useEffect} from 'react';

import { Route, Switch , Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer/Footer.jsx';
import Navegacion from '../Navegacion/Navegacion';
import { Accordion, Navbar, Card, Button, Container } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar.js';




// const url = 'localhost:3001';
//
//
// const [products, setProduct] = useState([]);

// const onSearch = (search) => {
//   //console.log('NOmbre: ' + search)
//   axios.get(`http://${url}/products/search?query=${search}`).then((res) => {
//     setProduct([]);
//     let { data } = res.data;
//     console.log(data);
//     setProduct(data);
//     return;
//   });
// };
//  < Navegacion link={enlacesUser} showSearchbar={true} onSearch={onSearch} />
var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/Faqs' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	{ text: 'ADMIN', to: '/admin' },
];

export default function Faqs(){
  return(
  <div>
		<Container className={`my-3`}>
    <Accordion defaultActiveKey="0">
      {/*pregunta 1*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          ¿ Que es Discover ?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Donde por fin encontraras todos los Productos para tu celular que estabas buscando, ademas de algunas cosas para cuidarte de COVID</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/*pregunta 2*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          ¿ Como nacio Discover ?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>Porque tenemos hambre</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/*pregunta 3*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="3">
          ¿ Puedo ver la tienda sin ser cliente?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <Card.Body>Por supuesto, puedes ver los productos, agregarlos a tu carrito, borrarlos, pero cuando vayas a pagar te vamos a pedir loguearte, para asi brindarte un mejor servivcio</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/*pregunta 4*/}
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="4">
          ¿ Que metodos de pago hay ?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="4">
          <Card.Body>Recibimos mercado pago, Paypal y cabezas de ganado a precio de mercado</Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>
	</Container>
  </div>

  )
}
