import React from 'react';
import s from '../../styles/addReview.module.css';
import {Button, Modal, Row, Col, Form } from 'react-bootstrap';
import Review from '../Review/review'

const AddReview = ({show, setShow, product})=>{
    return(
        <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName={s.cont_print}
        aria-labelledby="example-custom-modal-styling-title"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body className={`show-grid ${s.cont_body}`}>
        <Row className={s.cont}>
            <Col xs={12} md={4} className={s.cont_img}>
                <div className={s.imagen}>
                    <img src={product.image}></img>
                     <h6>{product.name}</h6>
                </div>               
            </Col>
            <Col xs={6} md={8} className={s.cont_inf} >
                <div className={s.info}>
                    <Modal.Header className={s.header} closeButton>
                     <Modal.Title className={s.title}>Tu opinión es importante!</Modal.Title>
                    </Modal.Header>
                    <Form>                        
                        <div className={s.title2}>
                            <h6>Calificación general</h6>
                            <div className={s.strat}>
                                <Review/>
                            </div>

                        </div>
                        <Form.Group>
                            <Form.Label className={s.title2}>Titulo</Form.Label>
                            <Form.Control className={s.input} size="sm" type="text" placeholder="Ejemplo: ¡Es muy liviano!"/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={s.title2}>Escriba su comentario</Form.Label>
                            <Form.Control className={s.input} as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    <div className={s.recordar}>
                        <p>¿Recomendarias este producto a otra persona?</p>                
                        <Button className={s.button}>SI</Button>
                        <Button className={s.button}>NO</Button>                       
                    </div>
                    <div className={s.addCom}>
                    <Button className={s.button2}>Agregar comentario</Button> 
                    </div>
                     

                    

                    
                </div>              
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
}
export default AddReview;