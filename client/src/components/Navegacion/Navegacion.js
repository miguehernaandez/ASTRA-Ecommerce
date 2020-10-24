import React from 'react';
import { useHistory } from 'react-router-dom';

// Logo
import logo from '../../multimedia/logo.png';

// Bootstrap
import { Navbar, Nav, Container, Col } from 'react-bootstrap';

// CSS
import s from '../../styles/Navbar.module.css';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userLogin, faShoppingCart as shopCart } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar';
import { connect } from 'react-redux'

// React -Routes
import { Link } from 'react-router-dom';
//Coockie
import Cookie from 'js-cookie';

//Actions
import {logout} from '../../store/actions/loginActions'

function Navegacion(props) {
	console.log('State User Loaded')
	console.log(props.userLogin)

	const history = useHistory();

	const handlerClick = () => {
		window.location = '/'
		//history.push('/')
		props.loginActionP()
		Cookie.remove('userLoad');
		return
	 }
	
	console.log('********props nav ***************')
	console.log(props.cartP[0])
	return (
		<Navbar className={`${s.navbar} sticky-top`}>
			<Container style={{ maxWidth: '1200px' }}>
				<Col lg={1}>
					<Navbar.Brand   as={Link} to='/'>
						{/* Logo */}
						<img className={`${s.logo}`} src={logo}></img>
					</Navbar.Brand>
				</Col>

				{/* Sector central del navbar: links y buscador */}
				{props.userLogin
					? props.userLogin.role === 'client' 
						? 
							<Col lg={6} className={`d-flex`}>
							{props.linksU.map((enlace) => {
								return (
									<div key={enlace.text} className={`flex-fill ${s.separador}`}>
										<Nav.Link href='#' as={Link} to={enlace.to} className={`${s.navbarLinks}`}>
											{enlace.text}
										</Nav.Link>
									</div>
								);
							})}
							{/* Link: Categorias */}
							</Col>
						:
							<Col lg={6} className={`d-flex`}>
							{props.linksA.map((enlace) => {
								return (
									<div key={enlace.text} className={`flex-fill ${s.separador}`}>
										<Nav.Link href='#' as={Link} to={enlace.to} className={`${s.navbarLinks}`}>
											{enlace.text}
										</Nav.Link>
									</div>
								);
							})}
							{/* Link: Categorias */}
							</Col>
					: 
					<Col lg={6} className={`d-flex`}>
					{props.linksU.map((enlace) => {
						return (
							<div key={enlace.text} className={`flex-fill ${s.separador}`}>
								<Nav.Link href='#' as={Link} to={enlace.to} className={`${s.navbarLinks}`}>
									{enlace.text}
								</Nav.Link>
							</div>
						);
					})}
					{/* Link: Categorias */}
					</Col>
			 }

				<Col className='contenedorSearchInput' lg={3}>
					{props.showSearchbar && <SearchBar onSearch={props.onSearch}></SearchBar>}
					{/* <SearchBar></SearchBar> */}
				</Col>
				{!props.userLogin  ? 
				<Col lg={1} className={'d-flex'}>
					<Link to='/users'>
					{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon}`} icon={userLogin} size={'1x'} />}
					</Link>
					<Link to='/login'>
					{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon}`} icon={userLogin} size={'1x'} />}
					</Link>
					{!!props.showSearchbar && <div className={s.contCart}><Link to='/users/cart'><FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} /></Link><span className={s.shopCartIconSpan}>{props.cartP[0] ? props.cartP[0].products.length: 0}</span></div>}
					{!props.showSearchbar && (
						<Nav.Link href='#' as={Link} to={'/'} className={`${s.navbarLinks}`}>
							Logout
						</Nav.Link>
					)}
				</Col>
				:
					<Col lg={1} className={'d-flex'}>
					{
						<div className={s.contProfile}>
							{props.userLogin.role === 'admin'  ? 
							<span className={s.textProfile}>Admin {props.userLogin.name}</span>
							:
							<span className={s.textProfile}>{props.userLogin.name}</span>}
						
						 <Nav.Link href='#' as={Link} to={'/'} className={`${s.navbarLinks}`} onClick={handlerClick}>
							Logout
						</Nav.Link>
						{!!props.showSearchbar && <div className={s.contCart}><Link to='/users/cart'><FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} /></Link><span className={s.shopCartIconSpan}>{props.cartP[0] ? props.cartP[0].products.length: 0}</span></div>}
						</div>
					}
					</Col>
				}
			</Container>
		</Navbar>
	);
}


function mapStateToProps(state){
    return {
		cartP: state.cart,
		userLogin: state.userLogged
    }
}

function mapDispatchToProps(dispatch){
    return {
		loginActionP : () => dispatch(logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navegacion);