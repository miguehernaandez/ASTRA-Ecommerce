import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { loginAction } from '../../store/actions/loginActions';
import logo from '../../multimedia/logo.png';
import s from '../../styles/loggin.module.css';
import { Link } from 'react-router-dom';
// Google Login
import { GoogleLogin } from 'react-google-login';

const Login = ({ userLoggedP, loginActionP, messageErrorP, loggedP }) => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const history = useHistory();

	console.log(loggedP);

	const handlerInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		loginActionP(form);
		if (userLoggedP && userLoggedP.role === 'admin') {
			console.log('Entre al if de ADmin');
			return history.push('/admin');
		} else {
			return history.push('/');
		}
	};

	useEffect(() => {
		if (loggedP == true) {
			window.location.href = 'http://localhost:3000/';
		}
	}, [loggedP]);

	// <-------------------------- Google Login -------------------------->
	const clientIdCode = '269758003483-2l6nugnundjtidqt2djkq7kt9jptsgh8.apps.googleusercontent.com';

	const responseGoogleSuccess = (response) => {
		// alert('mepa que vamos bien che');
		console.log(response.profileObj.email);
		console.log(response.profileObj.googleId);
		var googleForm = {
			email: response.profileObj.email,
			password: response.profileObj.googleId,
		};
		console.log(googleForm);
		loginActionP(googleForm);
	};

	const responseGoogleFailure = (response) => {
		// alert('mepa que vamos bien che');
		alert('Hubo un problema con la autenticacion, vuelve a intentarlo');
		// window.location.href = 'http://localhost:3000/login';
	};
	// <-------------------------- Google Login -------------------------->

	// console.log(userLoggedP);

	return (
		<div className={s.cont_prin}>
			<div className={s.opac}>
				<Container className={s.cont} onSubmit={handleSubmit}>
					<div className={s.img}>
						<FontAwesomeIcon className={s.icon} icon={faUserCircle} size={'7x'} />
						{/* google login */}
						<GoogleLogin clientId={clientIdCode} buttonText='Ingresar' onSuccess={responseGoogleSuccess} onFailure={responseGoogleFailure} isSignedIn={false} cookiePolicy={'single_host_origin'} />
						{/* google login */}
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
