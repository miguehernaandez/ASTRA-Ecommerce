import React from 'react';
// Logo
import logo from '../../multimedia/logo.png';

// Bootstrap
import { Navbar, Nav, Container, Col, NavDropdown } from 'react-bootstrap';

// CSS
import s from '../../styles/Navbar.module.css';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userLogin, faShoppingCart as shopCart, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar';
import { connect } from 'react-redux';

// React -Routes
import { Link } from 'react-router-dom';

// <--------------------------- IMPORTS --------------------------->

function Navegacion(props) {
	// <--------------------------- FUNCIONES --------------------------->
	const handleHamburgerIcon = function () {
		// Esta funcion hace que cambie el icono cuando la barra de navegacion se depliega o se colapsa
		var botonHamburguesa = document.getElementById('hamburgerButton');
		var botonHamburguesa2 = document.getElementById('hamburgerButton2');
		// console.log(botonHamburguesa);
		botonHamburguesa.classList.toggle('d-none');
		botonHamburguesa2.classList.toggle('d-none');
	};
	// <--------------------------- FUNCIONES --------------------------->

	return (
		<div>
			<Navbar collapseOnSelect expand='md' className={props.showSearchbar ? `justify-content-center ${s.navbar} py-0 px-2` : `justify-content-center ${s.navbarAdmin} py-0 px-2`}>
				<Container className={`${s.containerPrincipal} ${s.bordeVerde} d-flex m-0 p-0`}>
					<Navbar.Brand as={Link} to='/' className={`${s.bordeVerde} mx-0 ml-1`}>
						{/* Logo */}
						<img className={`${s.logo}`} src={logo}></img>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' className={`order-2`}>
						<FontAwesomeIcon id={`hamburgerButton`} className={`${s.bordeVerde} flex-fill ${s.plusIcon}`} icon={faBars} size={'1x'} onClick={handleHamburgerIcon} />
						<FontAwesomeIcon id={`hamburgerButton2`} className={`${s.bordeVerde} flex-fill ${s.plusIcon} d-none mr-1`} icon={faTimes} size={'1x'} onClick={handleHamburgerIcon} />
					</Navbar.Toggle>
					<Navbar.Collapse id='responsive-navbar-nav' className={`${s.bordeRojo} ${s.contColapse} justify-content-around order-3 order-md-1`}>
						{/* Aca adentro van los enlaces que se colapsan en pantallas mas pequenias */}
						<Nav className={`d-flex flex-row`}>
							{props.links.map((enlace, i, arr) => {
								return (
									<div key={enlace.text} className={props.showSearchbar && arr[i + 1] ? `${s.separador} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : !props.showSearchbar && arr[i + 1] ? `${s.separadorAdmin} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : !props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : ``}>
										<Nav.Link href='#' as={Link} to={enlace.to} className={props.showSearchbar ? `${s.navbarLinks}` : `${s.navbarLinksAdmin}`}>
											{enlace.text}
										</Nav.Link>
									</div>
								);
							})}
						</Nav>
						{/* SerachBar */}
						{/* <Col xs={`auto`} className={`${s.bordeAmarillo}`}> */}
						{props.showSearchbar && (
							<Col xs={`auto`} className={`${s.bordeAmarillo} mb-2 my-md-0`}>
								<SearchBar onSearch={props.onSearch}></SearchBar>
							</Col>
						)}
						{/* </Col> */}
					</Navbar.Collapse>
					{/* Iconos de carrito y login */}
					{props.showSearchbar && (
						<Col xs={4} sm={2} md={`auto`} className={`${s.bordeAmarillo} order-1 order-md-3 d-flex justify-content-between justify-content-lg-around`}>
							<Link to='/users'>{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon} mr-2`} icon={userLogin} size={'1x'} />}</Link>
							{!!props.showSearchbar && (
								<div className={s.contCart}>
									<Link to='/users/cart'>
										<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} />
									</Link>
									<span className={s.shopCartIconSpan}>{props.cartP[0] ? props.cartP[0].products.length : 0}</span>
								</div>
							)}
						</Col>
					)}
					{!props.showSearchbar && (
						<Col className={`order-1 order-lg-3`}>
							<Nav.Link href='#' as={Link} to={'/'} className={`${s.navbarLinksAdmin} ${s.bordeVerde} `}>
								Logout
							</Nav.Link>
						</Col>
					)}
				</Container>
			</Navbar>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		cartP: state.cart,
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Navegacion);
