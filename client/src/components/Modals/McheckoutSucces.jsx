import React from 'react';
import s from '../../styles/avisoLoggin.module.css';
import {Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChackoutSucces = ({showSuccess})=>{

    return(
        <div>
        <Modal
        show={showSuccess}
        >
        <Modal.Header className={s.title} closeButton>
          <Modal.Title >
          ¡Hola!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.cont}>
          <p>
            Compra exitosa!!
          </p>
          <di className={s.button}>
          <Button className={s.button1} as={Link} to={`/users`}>Soy nuevo</Button>
          <Button className={s.button2} as={Link} to={`/login`}>Ya tengo cuenta</Button>
          </di>
         

        </Modal.Body>
      </Modal>
      </div>

    )
}
export default ChackoutSucces;