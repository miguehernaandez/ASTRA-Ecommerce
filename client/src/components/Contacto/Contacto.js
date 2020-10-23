import React, {Component} from 'react';
import Navegacion from '../Navegacion/Navegacion';
import Footer from '../Footer/Footer.jsx';


const reactGoogleDocsViewer = require("react-google-docs-viewer");



var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/Faqs' },
	{ text: 'Contacto', to: '/' },
	{ text: 'ADMIN', to: '/admin' },
];


export default function Contacto(){
    return(
      <div>
      <Navegacion links={enlacesUser} showSearchbar={true} />
        <div>

          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdjOiVz4aYIimh9zrK7Nru5SzjPTr9p-VSZADnKr7HuJJoXZg/viewform?embedded=true" width="640" height="805" frameborder="0"
           marginheight="0" marginwidth="0"></iframe>
      </div>
      <Footer></Footer>
    </div>
  )

}
