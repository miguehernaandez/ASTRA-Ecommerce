// React
import React from 'react';
import { useState, useEffect } from 'react';

// React-Router-Dom
import { useRouteMatch, Route, useHistory } from 'react-router-dom';

// Bootstrap
import { Button, Container } from 'react-bootstrap';

// CSS
import s from '../../styles/ProductDet.module.css';

// Componentes
import Navegacion from '../Navegacion/Navegacion';
import Footer from '../Footer/Footer';
import Slider from '../Slider/Slider';
import AddReview from '../Modals/AddReview';
import Reviews from './Reviews';

// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Axios
import axios from 'axios';

import { connect } from 'react-redux';
import {getProducts}from '../../store/actions/product_actions';
import { addToCart } from '../../store/actions/cart_actions';
import {addReview} from '../../store/actions/review_actions';

const url = 'localhost:3001';

// <---------------------------Componente--------------------------->
const Product = ({ productsP,getProductP, addToCartP, addReviewP, userLoggedP }) => {
	
	const [qty, setQty] = useState(1)
	const [show, setShow] = useState(false)
	const [review, setReview] = useState({})
	const match = useRouteMatch();
	const history = useHistory();
	const { id } = match.params;
	let objP = {}
	var objProduct = productsP.find(d => { return d.id == id;})

	console.log(objProduct)
	for(let pr in objProduct){
		var prop = pr
		objP[prop] = objProduct[pr]
	}

	const promedioGeneral = (function (reviews) {
		
		if (reviews){
			var cantReviews = reviews.length;
			var totalEstrellas = 0;
			reviews.forEach((review) => {
				totalEstrellas += review.rate;
			})
			return Math.round(totalEstrellas / cantReviews).toFixed(1);
		}

	})(objP.reviews);

	const renderCantEstrellas = function (num) {
		var arrayEstrellas = [];
		for (let i = 0; i < num; i++) {
			arrayEstrellas.push(true);
		}
		for (let i = 0; i < 5 - num; i++) {
			arrayEstrellas.push(false);
		}
		return arrayEstrellas;
	};

	const cantEstrellasPromGeneral = renderCantEstrellas(promedioGeneral);

	const handlerAddToCart = (id, qty)=>{
		addToCartP(id, qty)
		history.push(`/users/cart`)
	}
	const handlerReview =()=>{
		if(!userLoggedP){
			history.push(`/login`)
		}else{
			setShow(true)
		}
	}

	const handlerAddReview = (review, productId)=>{
		let newReview = {
			...review,
			userId:userLoggedP.id
		} 
		addReviewP(newReview, productId)
		setShow(false)
		setReview({})
	}

	const handlerRate = (e)=>{
		if(e.target.checked){
			setReview({
				...review,
				rate: parseInt(e.target.value) 
			})
		}	
	}

	const reviewForm =(e)=>{
		let newReview = {
			...review,
			[e.target.name]: e.target.value
		   } 
		setReview(newReview)	
	}

	console.log(objP.reviews)
	useEffect(() => {
		getProductP();
	}, []);


	return (
		<div>
			<Container>		
				<div className={s.cont_prin}>
					<div className={s.cont}>
						<div className={s.cont_img}>						
							<img src={objP.image}></img>
						</div>
						<div className={s.cont_info}>
							<h3>{`${objP.name}` || `Product Name Here`}</h3>
							<h4>$ {`${objP.price}` || `00000`}</h4>
							<h6>Referencia: {`${objP.sku}` || `codReferencia`}</h6>
							<div className={s.contReviw}>
							<div className={s.icon}>
								{cantEstrellasPromGeneral.map((elem) => {
									if (elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaColor}`} />;
									if (!elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaInactiva}`} />;
								})}
							</div>
							<p onClick={()=>handlerReview()}>Escribir comentario</p>
							</div>
							
							<p>{`${objP.description}` || `Descripcion no disponible`}</p>
							<p>
								<span className={s.dim}>Dimensiones:</span> {`${objP.dimentions}` || `noDisponible`}
							</p>
							<div className={s.cont_cant}>
								{objP.stock > 0 ?
								<div className={s.cont_cant2}>
									<label for='Cantidad'>Candidad:</label>
									<select name='Cantidad' id='Cantidad' className={s.select} value={qty} onChange={(e) => {setQty(e.target.value)}}>
										{[...Array(objP.stock).keys()].map(x => {
											return (
												<option value={x+1}>{x+1}</option>
											)
										})}
									</select>
									<h6> {objP.stock} Unidades Disponibles</h6> 
								</div>
								: 
								<h4 className={s.agotadoProct}> Producto Agotado</h4>}
							</div>
							{objP.stock > 0 && 
								<div className={s.cont_button}>
									<Button className={s.buttonCom}>Comprar ahora</Button>
									<Button className={s.buttonCar} onClick={() => handlerAddToCart(objP.id, qty)}>Agregar al carrito</Button>
								</div>
							}
						</div>
					</div>
				</div>
				<AddReview
					show={show}
					setShow={setShow}
					product={objP}
					handlerAddReview={handlerAddReview}
					reviewForm ={reviewForm}
					review ={review}
					handlerRate={handlerRate}
				/>
				<Reviews 
					arrayReviews={objP.reviews}
					promedioGeneral={promedioGeneral}
					renderCantEstrellas={renderCantEstrellas}
				/>
			</Container>
			<Footer />
		</div>
	);
};


function mapStateToProps(state){
    return {
		productsP: state.products,
		userLoggedP: state.userLogged
    }
}
function mapDispatchToProps(dispatch){
    return {
		getProductP : () => dispatch(getProducts()),
		addToCartP : (id, qty) => dispatch(addToCart(id, qty)),
		addReviewP : (review, productId)=> dispatch(addReview(review, productId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

