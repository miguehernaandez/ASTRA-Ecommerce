import React from 'react';
import s from '../../styles/avisoLoggin.module.css';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LoginModalNoUser = ({ showModalNoUser, setShowModalNoUser }) => {
	return (
		<div>
			<Modal centered show={showModalNoUser} onHide={() => setShowModalNoUser(false)} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title'>
				<Modal.Header className={s.title} closeButton>
					<Modal.Title>El usuario ingresado no se encuentra registrado</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					<p>Para poder ingresar primero debes registrarte.</p>
					<di className={s.button}>
						<Button className={s.button1}>
							{/* Ingreso por passport */}
							<a href='http://localhost:3001/users/auth/google'>Registrarse con Google</a>
						</Button>
						<Button className={s.button2} as={Link} to={`/users`}>
							Crear cuenta independiente
						</Button>
					</di>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export const LoginModalAuthError = ({ showModalAuthError, setShowModalAuthError }) => {
	return (
		<div>
			<Modal centered show={showModalAuthError} onHide={() => setShowModalAuthError(false)} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title'>
				<Modal.Header className={s.title} closeButton>
					<Modal.Title>Hubo en error con tus credenciales de Google</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					<p>Por favor, intentalo de nuevo</p>
					<di className={s.button}>
						<Button className={s.button2} onClick={() => setShowModalAuthError(false)}>
							Entendido
						</Button>
					</di>
				</Modal.Body>
			</Modal>
		</div>
	);
};
