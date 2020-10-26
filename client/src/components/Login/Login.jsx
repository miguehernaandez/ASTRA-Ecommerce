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

	// useEffect(() => {
	//     if( loggedP === false ){
	//         return history.push('/login')
	//     }
	// },[])

	console.log(userLoggedP);

	return (
		<div className={s.cont_prin}>
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
