import React, {Component} from 'react';
import Navegacion from '../Navegacion/Navegacion';
import Footer from '../Footer/Footer.jsx';
import {Navbar, Container} from 'react-bootstrap';
import s from '../../styles/contacto.module.css';

const reactGoogleDocsViewer = require("react-google-docs-viewer");



var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/Faqs' },
	{ text: 'Contacto', to: '/' },

];


export default function Contacto(){
    return(
      <div>
      <Navegacion links={enlacesUser} showSearchbar={true} />
        <div>
          <Container className={s.resposive}>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdjOiVz4aYIimh9zrK7Nru5SzjPTr9p-VSZADnKr7HuJJoXZg/viewform?embedded=true"
           />
				 </Container>
				{/* <Container className={s.map}>
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5971.231596040454!2d-109.42844439848862!3d-27.14006480150786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9947fb0217260611%3A0xc7614812f982df72!2sAhu%20Tahai!5e0!3m2!1ses-419!2scl!4v1603736300816!5m2!1ses-419!2scl"/>

					</Container>
					<a className={s.dire}>
						<span>Ahu Tahai
Hanga Roa, Isla de Pascua, Valparaíso </span>
					</a>
*/}


			</div>
      <Footer></Footer>
    </div>
  )

}
