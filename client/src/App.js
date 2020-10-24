import React, { useState, useEffect } from 'react';
import './App.css';
import PrinciapalAdmin from './components/AdminForm/pageP';
import Product from './components/AdminForm/product';
import Category from './components/AdminForm/Categorys';
import Orders from './components/AdminForm/Orders';
import Navegacion from './components/Navegacion/Navegacion';
import WellcomeAdmin from './components/AdminForm/WellcomAdmin';
import Slider from './components/Slider/Slider';
import Footer from './components/Footer/Footer';
import ProductDet from './components/ProductDet/index';
import ProductCard from './components/ProductCard/index';
import Catalogo from './components/Catalogo/index';
import FormUsers from './components/FormUsers/FormUsers.jsx';
import UsersData from './components/AdminForm/UsersData';
import UserDetaul from './components/AdminForm/DetailUser.jsx'
import Faqs from './components/FAQs/Faqs.jsx';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import CartShop from './components/Cart/card';// Redux
import Login from './components/Login/Login';
import ProfileUser from './components/ProfileUser/ProfileUser';
import PrivateAdmin from './components/Routes/routePrivate'






const url = 'localhost:3001';

var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/Faqs' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	// { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
	{ text: 'ADMIN', to: '/admin' },
];

var enlacesUserConAdmin = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	// { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
	{ text: 'ADMIN', to: '/admin' },
];
var enlacesUserSinAdmin = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	// { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
]
var enlacesAdmin = [
	{ text: 'Inicio', to: '/admin' },
	{ text: 'Usuarios', to: '/admin/users' },
	{ text: 'Categorías', to: '/admin/category' },
	{ text: 'Productos', to: '/admin/product' },
	{ text: 'Ordenes', to: '/admin/orders' }
];


function App() {
	const [products, setProduct] = useState([]);

	const onSearch = (search) => {
		//console.log('NOmbre: ' + search)
		axios.get(`http://${url}/products/search?query=${search}`).then((res) => {
			setProduct([]);
			let { data } = res.data;
			console.log(data);
			setProduct(data);
			return;
		});
	};




	return (
		<div>
			{/* <ProductCard/> */}
			<Switch>
				<Route path='/' exact>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<Slider />

					<Footer></Footer>
					{/* <FormUsers></FormUsers> */}
				</Route>

				<Route path='/Faqs'  exact component={Faqs} />

				{/* <Route path='/admin' exact > */}
				<Route path='/admin'>
					<Navegacion linksA={enlacesAdmin} showSearchbar={false} />
					<PrinciapalAdmin />
					<PrivateAdmin path='/admin' exact component={WellcomeAdmin}/>
					{/* <PrivateAdmin path='/admin' exact >
						<WellcomeAdmin />
					</PrivateAdmin> */}
					<Route path='/admin/product' component={Product} />
					<Route path='/admin/category' component={Category} />
					<Route path='/admin/users' component={UsersData} />
					<Route path='/admin/orders' component={Orders} />
				</Route>

				<Route path='/users' exact>

					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin}  showSearchbar={true} onSearch={onSearch} />

					<FormUsers></FormUsers>
					<Footer></Footer>
				</Route>

				<Route path='/products/product/:id'>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} />
					<ProductDet />
				</Route>

				<Route path='/users/cart' component={CartShop} />
				<Route path='/products/catalogo' render={() => <Catalogo products={products} onSearch={onSearch} />}></Route>
				<Route path='/users/:id' component={UserDetaul}/>

				<Route path='/login' component={Login}/>
				<Route path='/profile' component={ProfileUser}/>
			</Switch>

		</div>
	);
}


export default App;
