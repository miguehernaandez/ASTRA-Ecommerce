import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Container, Navbar, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { loginAction } from '../../store/actions/loginActions';
import logo from '../../multimedia/logo.png';
import s from '../../styles/loggin.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginModal from '../Modals/LoginModal';

// Google Login
import { GoogleLogin } from 'react-google-login';

const Login = ({ userLoggedP, loginActionP, messageErrorP, checkForEmailP, loggedP }) => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	console.log(loggedP);

	const handlerInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// Comprobacion de si el usuario existe o no en la base de datos
		var dontShowModal = true;
		axios
			.get(`http://${url}/users`)
			.then((res) => {
				console.log(res.data.data);
				console.log(form);
				res.data.data.forEach((user) => {
					if (user.email == form.email) {
						console.log('true');
						// loginActionP(form);
						dontShowModal = false;
						loginActionP(form);
						if (userLoggedP && userLoggedP.role === 'admin') {
							console.log('Entre al if de ADmin');
							return history.push('/admin');
						} else {
							return history.push('/');
						}
					}
				});
			})
			.then((res) => {
				if (dontShowModal) setShowModal(true);
			});
	};

	useEffect(() => {
		if (loggedP == true) {
			window.location.href = 'http://localhost:3000/';
		}
	}, [loggedP]);

	// <-------------------------- Google Login -------------------------->
	const url = 'localhost:3001';
	const clientIdCode = '269758003483-2l6nugnundjtidqt2djkq7kt9jptsgh8.apps.googleusercontent.com';

	const responseGoogleSuccess = (response) => {
		console.log(response.profileObj.email);
		console.log(response.profileObj.googleId);
		var googleForm = {
			email: response.profileObj.email,
			password: response.profileObj.googleId,
		};
		console.log(googleForm);
		// Comprobacion de si el usuario existe o no en la base de datos
		var dontShowModal = true;
		axios
			.get(`http://${url}/users`)
			.then((res) => {
				console.log(res.data.data);
				res.data.data.forEach((user) => {
					if (user.email == response.profileObj.email) {
						console.log('true');
						loginActionP(googleForm);
						dontShowModal = false;
						return;
					}
				});
			})
			.then((res) => {
				if (dontShowModal) setShowModal(true);
			});
	};

	const responseGoogleFailure = (response) => {
		// alert('mepa que vamos bien che');
		alert('Hubo un problema con la autenticacion, vuelve a intentarlo');
		// window.location.href = 'http://localhost:3000/login';
	};
	// <-------------------------- Google Login -------------------------->
	return (
		<div className={s.cont_prin}>
			<LoginModal showModal={showModal} setShowModal={setShowModal}></LoginModal>
			<div className={s.opac}>
				<Container className={s.cont} onSubmit={handleSubmit}>
					<div className={s.img}>
						<FontAwesomeIcon className={s.icon} icon={faUserCircle} size={'7x'} />
					</div>
					<Form className={s.cont_form}>
						{messageErrorP === '' ? <div></div> : <div className={s.messageError}>{messageErrorP}</div>}
						<Form.Group className={s.cont_input} controlId='formBasicEmail'>
							<Form.Control className={s.input} type='email' placeholder='Enter email' onChange={handlerInput} name='email' />
							<FontAwesomeIcon className={s.icon2} icon={faEnvelope} size={'1x'} />
						</Form.Group>

						<Form.Group className={s.cont_input} controlId='formBasicPassword'>
							<Form.Control className={s.input} type='password' placeholder='Password' onChange={handlerInput} name='password' />
							<FontAwesomeIcon className={s.icon2} icon={faLock} size={'1x'} />
						</Form.Group>
						<div className={s.forgot}>
							<p>Forgot Password?</p>
						</div>
						<Button className={s.button} type='submit'>
							SING IN
						</Button>
						<hr></hr>
						<Row className={`justify-content-center`}>
							<Col>
								{/* google login */}
								<GoogleLogin clientId={clientIdCode} buttonText='Ingresar con Google' onSuccess={responseGoogleSuccess} onFailure={responseGoogleFailure} isSignedIn={false} cookiePolicy={'single_host_origin'} className={`w-100 justify-content-center`} />
								{/* google login */}
							</Col>
						</Row>
						<Link to='/users'>
							<div className={s.reg}>
								<p>
									Don´t have an account? <span> Sign Up</span>
								</p>
							</div>
						</Link>
					</Form>
				</Container>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		userLoggedP: state.userLogged,
		messageErrorP: state.messageError,
		loggedP: state.logged,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginActionP: (data) => dispatch(loginAction(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
