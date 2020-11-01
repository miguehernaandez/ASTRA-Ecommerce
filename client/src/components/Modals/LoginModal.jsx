import React from 'react';
import s from '../../styles/avisoLoggin.module.css';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginModal = ({ showModal, setShowModal }) => {
	return (
		<div>
			<Modal centered show={showModal} onHide={() => setShowModal(false)} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title'>
				<Modal.Header className={s.title} closeButton>
					<Modal.Title>El usuario no se encuentra registrado</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					<p>Para poder ingresar primero debes registrarte.</p>
					<di className={s.button}>
						<Button className={s.button1}>
							{/* Ingreso por passport */}
							<a href='http://localhost:3001/users/auth/google'>Sign In with Google</a>
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
export default LoginModal;
