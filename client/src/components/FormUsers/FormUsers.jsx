// React
import React from 'react';

// Bootstrap
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap';

// CSS
import s from '../../styles/FormUsers.module.css';

// Redux
import { connect } from 'react-redux';

// Actions
import { createUser } from '../../store/actions/userActions.js';
// <-------------------------------------------------------------->
const url = 'localhost:3001';

const FormUsers = function ({ usersP, createUserP, createUserSuccessP }) {
	console.log(createUserSuccessP);
	console.log(usersP);
	const getUserData = function () {
		let name = document.getElementById(`name`).value,
			// 	apellido = document.getElementById(`apellido`).value,
			// 	telefono = document.getElementById(`telefono`).value,
			// 	dni = document.getElementById(`dni`).value,
			email = document.getElementById(`email`).value,
			// fechaNacimiento = document.getElementById(`fechaNacimiento`).value,
			// direccion = document.getElementById(`direccion`).value,
			// pais = document.getElementById(`pais`).value,
			// provincia = document.getElementById(`provincia`).value,
			// ciudad = document.getElementById(`ciudad`).value,
			// codPostal = document.getElementById(`codPostal`).value,
			// userName = document.getElementById(`userName`).value,
			password = document.getElementById(`password`).value,
			passwordConfirm = document.getElementById(`passwordConfirm`).value;
		// terminos = document.getElementById(`terminos`).checked;

		let userData = {
			// nombre,
			// apellido,
			// telefono,
			// dni,
			name,
			email,
			// fechaNacimiento,
			// direccion,
			// pais,
			// provincia,
			// ciudad,
			// codPostal,
			// userName,
			password,
			// passwordConfirm,
			// terminos: terminos,
			role: 'client',
		};
		console.log(userData);
		return userData;
	};

	// personId: {
	// 		type: DataTypes.INTEGER,
	// 		allowNull: false,
	// 	},
	// 	email: {
	// 		type: DataTypes.STRING,
	// 		allowNull: false,
	// 	},
	// 	password: {
	// 		type: DataTypes.STRING,
	// 		allowNull: false,
	// 	},
	// 	role: {
	// 		type: DataTypes.ENUM('client', 'admin'),
	// 		allowNull: false,
	// 	},

	const createSuccess = function () {
		if (createUserSuccessP) {
			return alert('Usuario creado correctamente!');
		} else {
			return alert('Usuario creado correctamente!');
		}
	};

	// Funcion que se dispara al hacer submit
	const handleSubmit = function (e) {
		e.preventDefault();
		var data = getUserData();

		// Comprobacion de que las contraseñas coincidan
		// if (data.password != data.passwordConfirm) {
		// 	return alert('las contras no coinciden');
		// }

		console.log('se estan por enviar los datos');
		console.log(data);
		createUserP(data);
		console.log(createUserSuccessP);
		createSuccess(); // Alert
	};

	const aceptarTerminos = function () {
		// Funcion para que el boton de submit solo este disponible si se aceptan terminos y condiciones
		if (document.getElementById('terminos').checked) {
			document.getElementById('submitButton').disabled = false;
		}
		if (!document.getElementById('terminos').checked) {
			document.getElementById('submitButton').disabled = true;
		}
	};

	return (
		<div className={`my-4`}>
			<Container>
			 <h1 className={`${s.formTitle}`}>Completa tus datos</h1>
				<Card className={`p-3 m-2 ${s.formCard}`}>					
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col lg={12}>
								<h2 className={s.subTitle}>Datos personales</h2>
							</Col>
							<Col lg={12}>								
								<Form.Row>
									<Col xs={12} md={6} lg={6}>
										<Form.Group  className={s.grupo}>											
											<Form.Control className={`${s.input}`} type='name'  id={`name`} required />
											<Form.Label className={s.label}>Nombre</Form.Label>
											<span className={s.menssage}>Ingrese su nombre completo</span>
										</Form.Group>
									</Col>
									<Col xs={12} md={6} lg={6}>
										<Form.Group  className={s.grupo}>											
											<Form.Control className={`${s.input}`} type='email'  id={`email`} required />
											<Form.Label className={s.label}>Email</Form.Label>
											<span className={s.menssage}>Asegurate de tener acceso a este email</span>
										</Form.Group>
									</Col>
								</Form.Row>
							</Col>
						</Row>
						<hr></hr>
						
						<Row>
							<Col lg={12}>
								<h2 className={s.subTitle}>Datos de la cuenta</h2>
							</Col>
							<Col lg={12}>
								<Form.Row>
									<Col xs={12} md={6} lg={6}>
									<Form.Group  className={s.grupo} >										
										<Form.Control className={`${s.input}`} type='password'  id={`password`} required />
										<Form.Label className={s.label}>Contraseña</Form.Label>
										<span className={s.menssage}>La contraseña debe contener minimo 8 caracteres y 1 mayuscula</span>
									</Form.Group>
									
									</Col>
									<Col xs={12} md={6} lg={6}>
									<Form.Group xs={12} md={6} lg={6} className={s.grupo} >										
										<Form.Control className={`${s.input}`} type='password'  id={`passwordConfirm`} required />
										<Form.Label className={s.label}>Confirma tu contraseña</Form.Label>
										<span className={s.menssage}>Confirme su contraseña</span>
									</Form.Group>
									</Col>
								</Form.Row>
							</Col>
						</Row>

						<Row className={s.terminos}>
							<Col lg={9}>
								<Form.Group  as={Row}>
									<Form.Check className={`ml-3`} id={`terminos`} label='Acepto los Términos y Condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad.' onClick={aceptarTerminos} />
								</Form.Group>								
							</Col>
						</Row>
					</Form>
				</Card>
				<Row>
					<Col className={s.content_buttom}>
						<Button className={`${s.botonSubmit}`} id='submitButton' type='submit' disabled={true}>
							Registrarme
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		usersP: state.users,
		createUserSuccessP: state.createUserSuccess,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createUserP: (data) => dispatch(createUser(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUsers);
