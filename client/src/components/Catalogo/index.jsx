import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/index';
import Navegacion from '../Navegacion/Navegacion';
import Filter from '../Filter/index';
import Page from '../Pagination/index.jsx';
import SideBar from '../SideBar/SideBar.jsx';
import { connect } from 'react-redux';
import { getCategories, getProductByCategory } from '../../store/actions/category_actions';
import { getProducts } from '../../store/actions/product_actions';
import { Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as faIcons from 'react-icons/fa';
import catEmpty from '../../multimedia/empty.jpg';
import s from '../../styles/catalogo.module.css';
const url = 'localhost:3001';

var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	{ text: 'ADMIN', to: '/admin' },
];

const Catalogo = ({ products, productsP, categories, getCategoryP, getProductP, onSearch, getProductByCategoryP }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(8);

	console.log(productsP);
	console.log(products);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPostsCat = productsP.slice(indexOfFirstPost, indexOfLastPost);
	const currentPostsSearch = products.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handlerSelect = (e) => {
		const catName = e.target.value;
		let obj = {
			[e.target.value]: e.target.checked,
		};
		if (obj[e.target.value] === false) {
			getProductP();
		} else {
			console.log(obj);
			getCategoryP();
			console.log(catName);
			getProductByCategoryP(catName);
		}
	};

	useEffect(() => {
		getProductP();
		getCategoryP();
	}, []);

	return (
		<div className={`${s.contPrincipal}`}>
			{/*<h5><a href="/products/catalogo" className={s.title5}>Mostrar todos</a></h5>*/}
			{products.length == 0 ? (
				productsP.length == 0 ? (
					<div className={s.catEmpty}>
                    <img src={catEmpty}></img>
                    <h1>¡UPS! PARECE QUE NO HAY NADA CARGADO EN EL CATÁLOGO AÚN</h1> 
                    <h6>Por favor, intenta de nuevo más tarde</h6>
                    <Link className={s.link} to='/'>Seguir navegando</Link>
                </div>
				) : (
					<div className={s.dplay}>
					<Filter></Filter>
					<Container>
						{/* <h1 className={s.title1}>Resultados ({productsP.length})</h1> */}
						<div className={s.cont_prin_card}>
							<div className={s.cont_card}>
								<Row>
									{currentPostsCat.map((p) => {
										return (
											<Col lg='3'>
												<ProductCard id={p.id} name={p.name} description={p.description} img={p.image} price={p.price} stock={p.stock} />
											</Col>
										);
									})}
								</Row>
							</div>
						</div>

						<Page postsPerPage={postsPerPage} totalPosts={productsP.length} paginate={paginate} />
					</Container>
					</div>
				)
			) : (
				<div className={s.dplay}>

				<Filter></Filter>
				<Container>
					{/* <h1 className={s.title1}>Resultados ({products.length})</h1> */}
					<div className={s.cont_prin_card}>
						<div className={s.cont_card}>
							<Row>
								{currentPostsSearch.map((p) => {
									return (
										<Col lg='3'>
											<ProductCard id={p.id} name={p.name} description={p.description} img={p.image} price={p.price} stock={p.stock} />
										</Col>
									);
								})}
							</Row>
						</div>
					</div>
					<Page postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate} />
				</Container>
				</div>
			)}
		</div>
	);
};

function mapStateToProps(state) {
	return {
		categories: state.categories,
		productsP: state.products,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		getProductP: () => dispatch(getProducts()),
		getProductByCategoryP: (catN) => dispatch(getProductByCategory(catN)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
