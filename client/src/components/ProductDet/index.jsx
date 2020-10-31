// React
import React from 'react';
import { useState, useEffect } from 'react';

// React-Router-Dom
import { useRouteMatch, Route, useHistory } from 'react-router-dom';

// Bootstrap
import { Button, Container, Row, Col } from 'react-bootstrap';

// CSS
import s from '../../styles/ProductDet.module.css';

// Componentes
import Navegacion from '../Navegacion/Navegacion';
import Footer from '../Footer/Footer';
import Slider from '../Slider/Slider';
import AddReview from '../Modals/AddReview';
import AvisoLoggin from '../Modals/AvisoLoggin'
import Reviews from './Reviews';

// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Axios
import axios from 'axios';

import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/product_actions';
import { addToCart } from '../../store/actions/cart_actions';
import { addReview, deleteUserReview, getUserReviews } from '../../store/actions/review_actions';

const url = 'localhost:3001';

// <---------------------------Componente--------------------------->
const Product = ({productsP, userReviewsP, getProductP, addToCartP, addReviewP, userLoggedP, getUserReviewsP, deleteReviewP }) => {
	const [qty, setQty] = useState(1);
	const [show, setShow] = useState(false);
	const [showLoggin, setShowLoggin] = useState(false);
	const [editReview, setEditReview] = useState({});
	const [review, setReview] = useState({});
	const match = useRouteMatch();
	const history = useHistory();
	const { id } = match.params;
	let objP = {};
	var objProduct = productsP.find((d) => {
		return d.id == id;
	});

	console.log(objProduct);
	for (let pr in objProduct) {
		var prop = pr;
		objP[prop] = objProduct[pr];
	}

	console.log(objP);

	
	const getRate = (reviews) => {
		let rate = 0;
		if (reviews.length > 0){
			reviews.forEach(review => {
				rate += review.rate;
			})
			rate /= reviews.length;
		}
		return rate
	}
	if (objP.reviews) var rate = getRate(objP.reviews);

	const colorStars = (rate)=>{
		if(!rate){
			var rate = 0;
		}
		if (rate > 2.5) rate*=27;
		else if (rate <= 2.5) rate *=27.2;
		return rate;
	}
    var startWidth = colorStars(rate)


	const handlerAddToCart = (id, qty) => {
		addToCartP(id, qty);
		history.push(`/users/cart`);
	};
	const handlerReview = () => {
		if (!userLoggedP) {
			// history.push(`/login`);
			setShowLoggin(true);
		} else {
			setShow(true);
		}
	};

	const handlerAddReview = (review, productId) => {
		let newReview = {
			...review,
			userId: userLoggedP.id,
		};
		console.log(newReview)
		console.log(productId)
		addReviewP(newReview, productId);
		setShow(false);
		setReview({});
	};

	const handlerRate = (e) => {
		if (e.target.checked) {
			setReview({
				...review,
				rate: parseInt(e.target.value),
			});
		}
	};

	const reviewForm = (e) => {
		let newReview = {
			...review,
			[e.target.name]: e.target.value,
		};
		setReview(newReview);
	};
	const handlerEditRate = (e) => {
		if (e.target.checked) {
			setEditReview({
				...editReview,
				rate: parseInt(e.target.value),
			});
		}
	};

	const editReviewForm = (e) => {
		let newReview = {
			...editReview,
			[e.target.name]: e.target.value,
		};
		setEditReview(newReview);
	};

	const handlerEditReview = (editReview, productId) =>{
		let newReview = {
			...review,
			userId: userLoggedP.id,
		};
		addReviewP(newReview, productId);
		getUserReviewsP(objP.id, userLoggedP.id);
		setShow(false);
		setReview({});
	}

	console.log(objP.reviews);
	useEffect(() => {
		getProductP();
	}, []);

	return (
		<div>
			<Container className={s.container}>
				<div className={s.cont_prin}>
					<Row>
						<Col xs={12} md={12} lg={8} className={s.cont_img}>
							<img src={objP.image}></img>
						</Col>
						<Col xs={12} md={12} lg={4} className={s.cont_info}>
							<div className={s.infog}>
							<h3>{`${objP.name}` || `Product Name Here`}</h3>
							<h4>$ {`${objP.price}` || `00000`}</h4>
							<h6>Referencia: {`${objP.sku}` || `codReferencia`}</h6>
							<div className={s.contReviw}>
						<div className={s.icon}>
							<div className={s.emptyStars}>
								<FontAwesomeIcon icon={faStar} />
								<FontAwesomeIcon icon={faStar} />
								<FontAwesomeIcon icon={faStar}  />
								<FontAwesomeIcon icon={faStar}  />
								<FontAwesomeIcon icon={faStar}  />
							</div>
							<div className={s.fullStarsRate} style={{width: startWidth + 'px'}}>
								<div className={s.fullStars}>
									<FontAwesomeIcon icon={faStar}  />
									<FontAwesomeIcon icon={faStar}  />
									<FontAwesomeIcon icon={faStar}  />
									<FontAwesomeIcon icon={faStar}  />
									<FontAwesomeIcon icon={faStar}  />
								</div>
							</div>
						</div>
 						<div className={s.addReview}>
							<p onClick={() => handlerReview()}>Escribir comentario</p>
						</div>
							</div>

							<p>{`${objP.description}` || `Descripcion no disponible`}</p>
							<p>
								<span className={s.dim}>Dimensiones:</span> {`${objP.dimentions}` || `noDisponible`}
							</p>
							<div className={s.cont_cant}>
								{objP.stock > 0 ? (
									<div className={s.cont_cant2}>
										<label for='Cantidad'>Candidad:</label>
										<select
											name='Cantidad'
											id='Cantidad'
											className={s.select}
											value={qty}
											onChange={(e) => {
												setQty(e.target.value);
											}}
										>
											{[...Array(objP.stock).keys()].map((x) => {
												return <option value={x + 1}>{x + 1}</option>;
											})}
										</select>
										<h6> {objP.stock} Unidades Disponibles</h6>
									</div>
								) : (
									<h4 className={s.agotadoProct}> Producto Agotado</h4>
								)}
							</div>
							{objP.stock > 0 && (
								<div className={s.cont_button}>
									<Button className={s.buttonCom}>Comprar ahora</Button>
									<Button className={s.buttonCar} onClick={() => handlerAddToCart(objP.id, qty)}>
										Agregar al carrito
									</Button>
								</div>
							)}
							</div>
						</Col>
					</Row>
				</div>
				<AddReview show={show} setShow={setShow} product={objP} handlerAddReview={handlerAddReview} reviewForm={reviewForm} review={review} handlerRate={handlerRate} />
				<AvisoLoggin showLoggin={showLoggin} setShowLoggin={setShowLoggin}/>
				<Reviews 
					product={objP} 
					getProductP={getProductP} 
					userReviews={userReviewsP} 
					getUserReviews={getUserReviewsP} 
					deleteReviewP={deleteReviewP} 
					userLoggedP={userLoggedP}
					handlerRate={handlerEditRate}
					editReviewForm={editReviewForm}
					handlerEditReview={handlerEditReview}
					rating={rate}
				/>
			</Container>
			<Footer />
		</div>
	);
};

function mapStateToProps(state) {
	return {
		productsP: state.products,
		userLoggedP: state.userLogged,
		userReviewsP: state.userReviews,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getProductP: () => dispatch(getProducts()),
		addToCartP: (id, qty) => dispatch(addToCart(id, qty)),
		addReviewP: (review, productId) => dispatch(addReview(review, productId)),
		getUserReviewsP: (productId, userId) => dispatch(getUserReviews(productId, userId)),
		deleteReviewP: (productId, reviewId) => dispatch(deleteUserReview(productId, reviewId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
