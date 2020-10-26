// React
import React from 'react';
import { useState, useEffect } from 'react';

// React-Router-Dom
import { useRouteMatch, Route, useHistory } from 'react-router-dom';

// Bootstrap
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';

// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// CSS
import s from '../../styles/reviews.module.css';

export default function Reviews({ arrayReviews, promedioGeneral, renderCantEstrellas}) {
	console.log('**********************Componente Reviews***********************************')
	console.log(arrayReviews);
	// Los datos que necesito de las reviews son: cantEstrellas, cuerpoTextoReview,	likes, dislikes
	// <-----------------------------REVIEWS DE PRUEBA----------------------------->
	// var review1 = {
	// 	cantEstrellas: 1,
	// 	cuerpoTextoReview: `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.`,
    //     title: `tituiwkfjfjfjfjfjf`,
    //     likes: 11,
	// 	dislikes: 11,
	// };
	// var review2 = {
	// 	cantEstrellas: 4,
	// 	cuerpoTextoReview: `El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.`,
	// 	likes: 22,
	// 	dislikes: 22,
	// };
	// var review3 = {
	// 	cantEstrellas: 5,
	// 	cuerpoTextoReview: `Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.`,
	// 	likes: 333,
	// 	dislikes: 333,
	// };
	// var review4 = {
	// 	cantEstrellas: 4,
	// 	cuerpoTextoReview: `Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.`,
	// 	likes: 333,
	// 	dislikes: 333,
	// };
	// var review5 = {
	// 	cantEstrellas: 4,
	// 	cuerpoTextoReview: `"Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).`,
	// 	likes: 333,
	// 	dislikes: 333,
	// };
	// var review6 = {
	// 	cantEstrellas: 3,
	// 	cuerpoTextoReview: `Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.`,
	// 	likes: 333,
	// 	dislikes: 333,
	// };
	// const pruebaReviews = [review1, review2, review3, review4, review5, review6];
	// <-----------------------------REVIEWS DE PRUEBA----------------------------->

	// <-----------------------------FUNCIONES----------------------------->
	// Promeio general del producto (funcion autoinvocada)

	const cantEstrellasPromGeneral = renderCantEstrellas(promedioGeneral);
	// Opinion general (puede ser 'malo', 'regular', 'bueno', 'muy bueno' o 'excelente')
	const opinionGeneral = function (numEstrellas) {
		var opciones = ['malo', 'regular', 'bueno', 'muy bueno', 'excelente'];
		return opciones[numEstrellas - 1];
	};

	// Devuelve un array con 5 elementos que son 'true' o 'false'. Se utiliza para renderizar estrellas de color por cada 'true' y estrellas grises por cada 'false'


	// Cantidad de estrellas del promedio general

	// console.log(cantEstrellasPromGeneral);

	// Devuelve el valor que va dentro del atributo 'now' en cada progress bar
	const nowProgressBar = function (array, estrellas) {
		var nowNumerador = array.filter((review) => review.rate == estrellas);
		return Math.floor((nowNumerador.length / array.length) * 100);
	};

	const minusIcon = document.getElementById('minusIcon');
	const plusIcon = document.getElementById('plusIcon');
	const contPrincipal = document.getElementById('contPrincipal');

	const handleOpenClose = function () {
		minusIcon.classList.toggle('d-none');
		plusIcon.classList.toggle('d-none');
		contPrincipal.classList.toggle('d-none');
	};

	// <-----------------------------FUNCIONES----------------------------->

	// <-----------------------------PRUEBA DE REVIEWS----------------------------->
	// arrayReviews = true; // Esta linea es solo para probar. 'true' muestra los comentarios, 'false' un texto auxiliar
	// <-----------------------------PRUEBA DE REVIEWS----------------------------->

	if (!arrayReviews || arrayReviews.length < 1){
		return (
			<Card className={`my-5 p-4 ${s.productReviewCard}`}>
				<Row className={`${s.bordeRojo} justify-content-end w-100 m-0 mt-n1`}>
					<FontAwesomeIcon icon={faMinus} size={'1x'} id={`minusIcon`} className={`${s.openCloseIcon}`} onClick={handleOpenClose} />
					<FontAwesomeIcon icon={faPlus} size={'1x'} id={`plusIcon`} className={`${s.openCloseIcon} d-none`} onClick={handleOpenClose} />
				</Row>
				<Row className={`${s.bordeRojo} justify-content-center justify-content-md-start w-100 m-0`}>
					<h3 className={``}>Opiniones sobre el producto</h3>
				</Row>
				<Row className={`${s.bordeRojo} w-100 m-0 my-2`}>
					<p className={`${s.opinionDetalladaComentario} px-1 my-1`}>Aún no hay opiniones de este producto. Sé el primero en opinar!</p>
				</Row>
			</Card>
		)
	} else {
		return (
			<Card className={`my-5 p-4 ${s.productReviewCard}`}>
				<Row className={`${s.bordeRojo} justify-content-end w-100 m-0 mt-n1`}>
					<FontAwesomeIcon icon={faMinus} size={'1x'} id={`minusIcon`} className={`${s.openCloseIcon}`} onClick={handleOpenClose} />
					<FontAwesomeIcon icon={faPlus} size={'1x'} id={`plusIcon`} className={`${s.openCloseIcon} d-none`} onClick={handleOpenClose} />
				</Row>
				<Row className={`${s.bordeRojo} justify-content-center justify-content-md-start w-100 m-0`}>
					<h3 className={``}>Opiniones sobre el producto</h3>
				</Row>
				<div className={ s.contPrincipal } id={`contPrincipal`}>
					<hr className={`m-0 p-0`}></hr>
					<Row className={`${s.bordeRojo} row align-items-center py-3 m-0`}>
						<Col xs={12} md={4} lg={3} className={`${s.bordeRojo} ${s.colResumenReviews} p-0 d-flex flex-column justify-content-around`}>
							<Row className={`justify-content-md-end justify-content-center p-0 m-0 mt-0`}>
								{/* Promedio general que tiene el producto */}
								<p className={`${s.productPromedio} ${s.bordeRojo} p-0 m-0`}>{promedioGeneral}</p>
							</Row>
							<Row className={`${s.bordeRojo} justify-content-md-end justify-content-center mt-1 p-0 mx-0`}>
								{/* Cantidad de estrellas en promedio que tiene el producto */}
								{cantEstrellasPromGeneral.map((elem) => {
									if (elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaColor}`} />;
									if (!elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaInactiva}`} />;
								})}
							</Row>
							<Row className={`${s.bordeRojo} justify-content-md-end justify-content-center  p-0 mt-1 mx-0`}>
								<p className={`${s.cantOpinionesText} my-0 text-right`}>Promedio entre {arrayReviews.length} opiniones</p>
							</Row>
						</Col>
						<Col xs={12} md={8} className={`${s.bordeRojo} ${s.colResumenReviews} d-flex flex-column justify-content-around`}>
							{/* Barras contadoras de progreso de cada cantidad de estrellas */}
							{/* Uso el mismo array que para la cantidad de estrellas porque solo necesito un array con 5 elementos, no hay otro motivo */}
							{cantEstrellasPromGeneral.map((elem, i) => {
								console.log(elem, 5 - i);
								return (
									<Row className={`${s.bordeRojo} p-0 m-0 mt-2 align-items-center justify-content-md-start justify-content-center`}>
										<Col xs={`auto`} className={`p-0 m-0 text-right`}>
											<p className={`${s.bordeRojo} ${s.progressBarText} p-0 m-0`}>{5 - i} estrellas</p>
										</Col>
										<Col xs={6}>
											<ProgressBar className={`${s.progressBar}`} variant='info' now={nowProgressBar(arrayReviews, 5 - i)} />
										</Col>
										<Col xs={`auto`} className={`p-0 m-0 text-left`}>
											<p className={`${s.bordeRojo} ${s.progressBarText} p-0 m-0`}>{arrayReviews.filter((review) => review.rate == 5 - i).length}</p>
										</Col>
									</Row>
								);
							})}
						</Col>
					</Row>
					<hr className={`m-0 mb-4 p-0`}></hr>
					<Row className={`${s.bordeRojo} my-2 mx-0`}>
						{/* <------------------ .map de cada comentario ------------------> */}
						{arrayReviews.map((review) => {
							console.log('*****************************')
							console.log(arrayReviews)
							return (
								<div className={`${s.reviewInfo}`}>
									<Row className={`${s.bordeRojo}`}>
										{renderCantEstrellas(review.rate).map((elem) => {
											if (elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaColor}`} />;
											if (!elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaInactiva}`} />;
										})}
									</Row>
									<Row>
										<h6 className={`${s.opinionGeneralComentario} p-1 mt-1 mb-0`}>Opinion general: {opinionGeneral(review.rate)}</h6>
									</Row>
                                    <Row>
										<h5 className={`${s.opinionGeneralComentario} p-1 mt-1 mb-0`}>{review.title}</h5>
									</Row>
									<Row className={``}>
										<p className={`${s.opinionDetalladaComentario} px-1 my-1`}>{review.content}</p>
									</Row>
									<Row className={s.likesReview}>
										<Col className={`${s.bordeRojo} pb-1 px-0 ml-3`} xs={`auto`}>
											<FontAwesomeIcon icon={faThumbsUp} size={'1x'} className={`${s.iconLikes}`} />
										</Col>
										<Col className={`${s.bordeRojo} p-0 m-0`} xs={`auto`}>
											<p className={`${s.cantLikes}`}>15</p>
										</Col>
										<Col className={`${s.bordeRojo} pt-1 px-0 ml-3`} xs={`auto`}>
											<FontAwesomeIcon icon={faThumbsDown} size={'1x'} className={`${s.iconLikes}`} />
										</Col>
										<Col className={`${s.bordeRojo} p-0 m-0`} xs={`auto`}>
											<p className={`${s.cantLikes}`}>7</p>
										</Col>
									</Row>
									<hr className={`m-0 mb-4 p-0`}></hr>
								</div>
								
							);
						})}
					</Row>
				</div>
			</Card>
		)
	}
}